using Microsoft.EntityFrameworkCore;

namespace Library.Data.Repositories;

public class EfRepository<TEntity>(LibraryDbContext context) : IRepository<TEntity>
    where TEntity : class
{
    private readonly DbSet<TEntity> set = context.Set<TEntity>();

    public IQueryable<TEntity> All() => set;

    public async Task AddAsync(TEntity entity) => await set.AddAsync(entity);

    public void Delete(TEntity entity) => set.Remove(entity);

    public Task<int> SaveChangesAsync() => context.SaveChangesAsync();
}
