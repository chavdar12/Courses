using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace MiniORM;

internal class ChangeTracker<T>
    where T : class, new()
{
    private readonly List<T> allEntities;
    private readonly List<T> added = new();
    private readonly List<T> removed = new();

    // Keeps clones of the loaded entities so modifications can be detected by comparing against them.
    public ChangeTracker(IEnumerable<T> entities) => allEntities = CloneEntities(entities);

    public IReadOnlyCollection<T> AllEntities => allEntities.AsReadOnly();

    public IReadOnlyCollection<T> Added => added.AsReadOnly();

    public IReadOnlyCollection<T> Removed => removed.AsReadOnly();

    public void Add(T item) => added.Add(item);

    public void Remove(T item) => removed.Add(item);

    public IEnumerable<T> GetModifiedEntities(DbSet<T> dbSet)
    {
        var primaryKeys = typeof(T).GetProperties().Where(p => p.HasAttribute<KeyAttribute>()).ToArray();

        foreach (var proxyEntity in AllEntities)
        {
            var primaryKeyValues = GetPrimaryKeyValues(primaryKeys, proxyEntity).ToArray();
            var entity = dbSet.Entities.FirstOrDefault(e => GetPrimaryKeyValues(primaryKeys, e).SequenceEqual(primaryKeyValues));

            if (entity != null && IsModified(proxyEntity, entity))
            {
                yield return entity;
            }
        }
    }

    private static IEnumerable<object> GetPrimaryKeyValues(IEnumerable<PropertyInfo> primaryKeys, T entity) =>
        primaryKeys.Select(pk => pk.GetValue(entity));

    private static bool IsModified(T original, T proxy) =>
        SqlProperties().Any(p => !Equals(p.GetValue(original), p.GetValue(proxy)));

    private static List<T> CloneEntities(IEnumerable<T> entities)
    {
        var properties = SqlProperties();

        return entities.Select(entity =>
        {
            var clone = new T();
            foreach (var property in properties)
            {
                property.SetValue(clone, property.GetValue(entity));
            }

            return clone;
        }).ToList();
    }

    private static PropertyInfo[] SqlProperties() =>
        typeof(T).GetProperties().Where(p => DbContext.AllowedSqlTypes.Contains(p.PropertyType)).ToArray();
}
