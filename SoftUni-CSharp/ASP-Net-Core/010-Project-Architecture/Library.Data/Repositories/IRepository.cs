namespace Library.Data.Repositories;

// Hides EF from the service layer: services ask for data, not for a DbContext.
public interface IRepository<TEntity>
    where TEntity : class
{
    IQueryable<TEntity> All();

    Task AddAsync(TEntity entity);

    void Delete(TEntity entity);

    Task<int> SaveChangesAsync();
}
