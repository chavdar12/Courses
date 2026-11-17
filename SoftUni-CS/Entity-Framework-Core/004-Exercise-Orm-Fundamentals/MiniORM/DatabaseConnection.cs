using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using System.Reflection;

namespace MiniORM;

// Builds and sends the SQL. Identifiers use [brackets], which both SQL Server and SQLite understand.
internal class DatabaseConnection
{
    private readonly Func<DbConnection> connectionFactory;
    private DbConnection connection;
    private DbTransaction transaction;

    public DatabaseConnection(Func<DbConnection> connectionFactory) => this.connectionFactory = connectionFactory;

    public void Open()
    {
        connection = connectionFactory();
        connection.Open();
    }

    public void Close()
    {
        transaction = null;
        connection.Dispose();
    }

    public DbTransaction StartTransaction() => transaction = connection.BeginTransaction();

    public IEnumerable<string> FetchColumnNames(string tableName)
    {
        using var reader = CreateCommand($"SELECT * FROM [{tableName}] WHERE 1 = 0").ExecuteReader();
        return Enumerable.Range(0, reader.FieldCount).Select(reader.GetName).ToArray();
    }

    public IEnumerable<T> FetchResultSet<T>(string tableName, params string[] columnNames)
        where T : class, new()
    {
        var columns = string.Join(", ", columnNames.Select(c => $"[{c}]"));
        using var reader = CreateCommand($"SELECT {columns} FROM [{tableName}]").ExecuteReader();

        var rows = new List<T>();
        while (reader.Read())
        {
            var entity = new T();
            foreach (var column in columnNames)
            {
                var value = reader[column];
                if (value is DBNull)
                {
                    continue;
                }

                var property = typeof(T).GetProperty(column)!;
                var type = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                property.SetValue(entity, Convert.ChangeType(value, type));
            }

            rows.Add(entity);
        }

        return rows;
    }

    public void InsertEntities<T>(IEnumerable<T> entities, string tableName, string[] columns)
    {
        // A single [Key] is an IDENTITY column, so the database generates it; composite keys are inserted.
        var keys = KeyProperties<T>();
        var insertColumns = keys.Length == 1 ? columns.Except(new[] { keys[0].Name }).ToArray() : columns;

        foreach (var entity in entities)
        {
            var command = CreateCommand(
                $"INSERT INTO [{tableName}] ({string.Join(", ", insertColumns.Select(c => $"[{c}]"))}) "
                    + $"VALUES ({string.Join(", ", insertColumns.Select(c => "@" + c))})"
            );
            AddParameters<T>(command, entity, insertColumns);
            command.ExecuteNonQuery();
        }
    }

    public void UpdateEntities<T>(IEnumerable<T> entities, string tableName, string[] columns)
    {
        var keys = KeyProperties<T>().Select(k => k.Name).ToArray();
        var setColumns = columns.Except(keys).ToArray();

        foreach (var entity in entities)
        {
            var command = CreateCommand(
                $"UPDATE [{tableName}] SET {string.Join(", ", setColumns.Select(c => $"[{c}] = @{c}"))} WHERE {Where(keys)}"
            );
            AddParameters<T>(command, entity, columns);
            command.ExecuteNonQuery();
        }
    }

    public void DeleteEntities<T>(IEnumerable<T> entities, string tableName)
    {
        var keys = KeyProperties<T>().Select(k => k.Name).ToArray();

        foreach (var entity in entities)
        {
            var command = CreateCommand($"DELETE FROM [{tableName}] WHERE {Where(keys)}");
            AddParameters<T>(command, entity, keys);
            command.ExecuteNonQuery();
        }
    }

    private static PropertyInfo[] KeyProperties<T>() =>
        typeof(T).GetProperties().Where(p => p.HasAttribute<KeyAttribute>()).ToArray();

    private static string Where(IEnumerable<string> keys) => string.Join(" AND ", keys.Select(k => $"[{k}] = @{k}"));

    private static void AddParameters<T>(DbCommand command, T entity, IEnumerable<string> columns)
    {
        foreach (var column in columns)
        {
            var parameter = command.CreateParameter();
            parameter.ParameterName = "@" + column;
            parameter.Value = typeof(T).GetProperty(column)!.GetValue(entity) ?? DBNull.Value;
            command.Parameters.Add(parameter);
        }
    }

    private DbCommand CreateCommand(string sql)
    {
        var command = connection.CreateCommand();
        command.CommandText = sql;
        command.Transaction = transaction;
        return command;
    }
}
