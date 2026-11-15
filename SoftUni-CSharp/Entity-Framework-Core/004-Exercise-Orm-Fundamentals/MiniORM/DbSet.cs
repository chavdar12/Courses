using System.Collections;

namespace MiniORM;

public class DbSet<TEntity> : ICollection<TEntity>
    where TEntity : class, new()
{
    internal DbSet(IEnumerable<TEntity> entities)
    {
        Entities = entities.ToList();
        ChangeTracker = new ChangeTracker<TEntity>(Entities);
    }

    internal ChangeTracker<TEntity> ChangeTracker { get; set; }

    internal IList<TEntity> Entities { get; set; }

    public int Count => Entities.Count;

    public bool IsReadOnly => Entities.IsReadOnly;

    public void Add(TEntity item)
    {
        ArgumentNullException.ThrowIfNull(item, "Item cannot be null");

        Entities.Add(item);
        ChangeTracker.Add(item);
    }

    public void Clear()
    {
        while (Entities.Any())
        {
            Remove(Entities.First());
        }
    }

    public bool Contains(TEntity item) => Entities.Contains(item);

    public void CopyTo(TEntity[] array, int arrayIndex) => Entities.CopyTo(array, arrayIndex);

    public bool Remove(TEntity item)
    {
        ArgumentNullException.ThrowIfNull(item, "Item cannot be null");

        var removed = Entities.Remove(item);
        if (removed)
        {
            ChangeTracker.Remove(item);
        }

        return removed;
    }

    public void RemoveRange(IEnumerable<TEntity> entities)
    {
        foreach (var entity in entities.ToArray())
        {
            Remove(entity);
        }
    }

    public IEnumerator<TEntity> GetEnumerator() => Entities.GetEnumerator();

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
