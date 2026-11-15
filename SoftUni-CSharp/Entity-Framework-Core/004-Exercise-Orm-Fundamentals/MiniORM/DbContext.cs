using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using System.Reflection;
using System.Runtime.ExceptionServices;
using Microsoft.Data.SqlClient;

namespace MiniORM;

public abstract class DbContext
{
    internal static readonly Type[] AllowedSqlTypes =
    {
        typeof(string), typeof(int), typeof(uint), typeof(long), typeof(ulong), typeof(decimal), typeof(double),
        typeof(bool), typeof(DateTime), typeof(int?), typeof(decimal?), typeof(bool?), typeof(DateTime?)
    };

    private readonly DatabaseConnection connection;
    private readonly Dictionary<Type, PropertyInfo> dbSetProperties;

    protected DbContext(string connectionString)
        : this(() => new SqlConnection(connectionString))
    {
    }

    // Any ADO.NET provider works; the tests pass SQLite here.
    protected DbContext(Func<DbConnection> connectionFactory)
    {
        connection = new DatabaseConnection(connectionFactory);
        dbSetProperties = DiscoverDbSets();
        Load();
    }

    public void SaveChanges()
    {
        var dbSets = dbSetProperties.Values.Select(p => p.GetValue(this)).ToArray();

        foreach (IEnumerable<object> dbSet in dbSets)
        {
            var invalidEntities = dbSet.Where(entity => !IsObjectValid(entity)).ToArray();
            if (invalidEntities.Any())
            {
                throw new InvalidOperationException($"{invalidEntities.Length} Invalid Entities found in {dbSet.GetType().Name}!");
            }
        }

        using (new ConnectionManager(connection))
        {
            // Disposing an uncommitted transaction rolls it back, so a failure leaves the database untouched.
            using var transaction = connection.StartTransaction();

            foreach (var dbSet in dbSets)
            {
                var persistMethod = typeof(DbContext)
                    .GetMethod(nameof(Persist), BindingFlags.Instance | BindingFlags.NonPublic)!
                    .MakeGenericMethod(dbSet.GetType().GetGenericArguments().First());

                try
                {
                    persistMethod.Invoke(this, new[] { dbSet });
                }
                catch (TargetInvocationException e) when (e.InnerException != null)
                {
                    ExceptionDispatchInfo.Capture(e.InnerException).Throw();
                }
            }

            transaction.Commit();
        }

        // Reload so new entities get their generated ids and the change trackers start clean.
        Load();
    }

    private void Load()
    {
        using (new ConnectionManager(connection))
        {
            InitializeDbSets();
        }

        MapAllRelations();
    }

    private void Persist<TEntity>(DbSet<TEntity> dbSet)
        where TEntity : class, new()
    {
        var tableName = GetTableName(typeof(TEntity));
        var columns = GetEntityColumnNames(typeof(TEntity));

        if (dbSet.ChangeTracker.Added.Any())
        {
            connection.InsertEntities(dbSet.ChangeTracker.Added, tableName, columns);
        }

        var modifiedEntities = dbSet.ChangeTracker.GetModifiedEntities(dbSet).ToArray();
        if (modifiedEntities.Any())
        {
            connection.UpdateEntities(modifiedEntities, tableName, columns);
        }

        if (dbSet.ChangeTracker.Removed.Any())
        {
            connection.DeleteEntities(dbSet.ChangeTracker.Removed, tableName);
        }
    }

    private void InitializeDbSets()
    {
        foreach (var (entityType, property) in dbSetProperties)
        {
            InvokeGeneric(nameof(PopulateDbSet), new[] { entityType }, property);
        }
    }

    private void PopulateDbSet<TEntity>(PropertyInfo dbSet)
        where TEntity : class, new()
    {
        var entities = LoadTableEntities<TEntity>();
        ReflectionHelper.ReplaceBackingField(this, dbSet.Name, new DbSet<TEntity>(entities));
    }

    private void MapAllRelations()
    {
        foreach (var (entityType, property) in dbSetProperties)
        {
            InvokeGeneric(nameof(MapRelations), new[] { entityType }, property.GetValue(this));
        }
    }

    private void MapRelations<TEntity>(DbSet<TEntity> dbSet)
        where TEntity : class, new()
    {
        MapNavigationProperties(dbSet);

        var collections = typeof(TEntity).GetProperties()
            .Where(p => p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(ICollection<>));

        foreach (var collection in collections)
        {
            var collectionType = collection.PropertyType.GetGenericArguments().First();
            InvokeGeneric(nameof(MapCollection), new[] { typeof(TEntity), collectionType }, dbSet, collection);
        }
    }

    // Fills e.g. Department.Employees or Employee.EmployeesProjects: items whose foreign key points back at the entity.
    // The same rule covers one-to-many and the mapping side of many-to-many relations.
    private void MapCollection<TDbSet, TCollection>(DbSet<TDbSet> dbSet, PropertyInfo collectionProperty)
        where TDbSet : class, new()
        where TCollection : class, new()
    {
        var entityType = typeof(TDbSet);
        var collectionType = typeof(TCollection);

        var primaryKey = entityType.GetProperties().Single(p => p.HasAttribute<KeyAttribute>());
        var foreignKey = collectionType.GetProperties().First(p =>
            p.GetCustomAttribute<ForeignKeyAttribute>() is { } fk && collectionType.GetProperty(fk.Name)!.PropertyType == entityType);

        var navigationDbSet = (DbSet<TCollection>)dbSetProperties[collectionType].GetValue(this)!;

        foreach (var entity in dbSet)
        {
            var primaryKeyValue = primaryKey.GetValue(entity);
            var navigationEntities = navigationDbSet.Where(e => Equals(foreignKey.GetValue(e), primaryKeyValue)).ToList();

            ReflectionHelper.ReplaceBackingField(entity, collectionProperty.Name, navigationEntities);
        }
    }

    private void MapNavigationProperties<TEntity>(DbSet<TEntity> dbSet)
        where TEntity : class, new()
    {
        var entityType = typeof(TEntity);
        var foreignKeys = entityType.GetProperties().Where(p => p.HasAttribute<ForeignKeyAttribute>());

        foreach (var foreignKey in foreignKeys)
        {
            var navigationProperty = entityType.GetProperty(foreignKey.GetCustomAttribute<ForeignKeyAttribute>()!.Name)!;
            var navigationDbSet = (IEnumerable<object>)dbSetProperties[navigationProperty.PropertyType].GetValue(this)!;
            var navigationPrimaryKey = navigationProperty.PropertyType.GetProperties().First(p => p.HasAttribute<KeyAttribute>());

            foreach (var entity in dbSet)
            {
                var foreignKeyValue = foreignKey.GetValue(entity);
                var navigationEntity = navigationDbSet.FirstOrDefault(e => Equals(navigationPrimaryKey.GetValue(e), foreignKeyValue));

                navigationProperty.SetValue(entity, navigationEntity);
            }
        }
    }

    private static bool IsObjectValid(object entity) =>
        Validator.TryValidateObject(entity, new ValidationContext(entity), new List<ValidationResult>(), validateAllProperties: true);

    private IEnumerable<TEntity> LoadTableEntities<TEntity>()
        where TEntity : class, new()
    {
        var table = typeof(TEntity);
        return connection.FetchResultSet<TEntity>(GetTableName(table), GetEntityColumnNames(table));
    }

    private string GetTableName(Type tableType) =>
        tableType.GetCustomAttribute<TableAttribute>()?.Name ?? dbSetProperties[tableType].Name;

    private Dictionary<Type, PropertyInfo> DiscoverDbSets() =>
        GetType().GetProperties()
            .Where(p => p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
            .ToDictionary(p => p.PropertyType.GetGenericArguments().First(), p => p);

    private string[] GetEntityColumnNames(Type table)
    {
        var columns = connection.FetchColumnNames(GetTableName(table)).ToHashSet();

        return table.GetProperties()
            .Where(p => columns.Contains(p.Name) && !p.HasAttribute<NotMappedAttribute>() && AllowedSqlTypes.Contains(p.PropertyType))
            .Select(p => p.Name)
            .ToArray();
    }

    // The entity types are only known at runtime, so the generic helpers are invoked through reflection.
    private void InvokeGeneric(string methodName, Type[] typeArguments, params object[] arguments)
    {
        var method = typeof(DbContext).GetMethod(methodName, BindingFlags.Instance | BindingFlags.NonPublic)!.MakeGenericMethod(typeArguments);
        try
        {
            method.Invoke(this, arguments);
        }
        catch (TargetInvocationException e) when (e.InnerException != null)
        {
            ExceptionDispatchInfo.Capture(e.InnerException).Throw();
        }
    }
}
