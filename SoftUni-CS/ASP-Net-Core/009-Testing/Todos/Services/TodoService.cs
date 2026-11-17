using Microsoft.EntityFrameworkCore;
using Todos.Data;

namespace Todos.Services;

public interface ITodoService
{
    Task<IReadOnlyList<Todo>> GetAllAsync();

    Task<Todo> AddAsync(string title);

    Task<bool> CompleteAsync(int id);
}

public class TodoService(TodoDbContext db) : ITodoService
{
    // Open items first, then by creation order.
    public async Task<IReadOnlyList<Todo>> GetAllAsync() =>
        await db.Todos.AsNoTracking().OrderBy(t => t.IsDone).ThenBy(t => t.Id).ToListAsync();

    public async Task<Todo> AddAsync(string title)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(title);

        var todo = new Todo { Title = title.Trim() };
        db.Todos.Add(todo);
        await db.SaveChangesAsync();
        return todo;
    }

    public async Task<bool> CompleteAsync(int id)
    {
        var todo = await db.Todos.FindAsync(id);
        if (todo is null)
        {
            return false;
        }

        todo.IsDone = true;
        await db.SaveChangesAsync();
        return true;
    }
}
