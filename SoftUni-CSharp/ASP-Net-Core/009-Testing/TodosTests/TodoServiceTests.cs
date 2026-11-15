using Microsoft.EntityFrameworkCore;
using Todos.Data;
using Todos.Services;

namespace TodosTests;

// Service tests against EF Core's in-memory provider: real queries, no database server.
public class TodoServiceTests
{
    private TodoDbContext db;
    private TodoService service;

    [SetUp]
    public void SetUp()
    {
        db = new TodoDbContext(new DbContextOptionsBuilder<TodoDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);
        service = new TodoService(db);
    }

    [TearDown]
    public void TearDown() => db.Dispose();

    [Test]
    public async Task AddTrimsAndSaves()
    {
        var todo = await service.AddAsync("  Learn Moq  ");

        Assert.That(todo.Id, Is.GreaterThan(0));
        Assert.That(db.Todos.Single().Title, Is.EqualTo("Learn Moq"));
    }

    [Test]
    public void AddRejectsBlankTitle()
    {
        Assert.ThrowsAsync<ArgumentException>(() => service.AddAsync(" "));
    }

    [Test]
    public async Task GetAllListsOpenBeforeDone()
    {
        var first = await service.AddAsync("first");
        await service.AddAsync("second");
        await service.CompleteAsync(first.Id);

        var titles = (await service.GetAllAsync()).Select(t => t.Title);

        Assert.That(titles, Is.EqualTo(new[] { "second", "first" }));
    }

    [Test]
    public async Task CompleteReportsWhetherTheTodoExists()
    {
        var todo = await service.AddAsync("x");

        Assert.That(await service.CompleteAsync(todo.Id), Is.True);
        Assert.That(db.Todos.Single().IsDone, Is.True);
        Assert.That(await service.CompleteAsync(999), Is.False);
    }
}
