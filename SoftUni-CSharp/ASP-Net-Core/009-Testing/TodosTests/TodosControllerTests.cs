using Microsoft.AspNetCore.Mvc;
using Moq;
using Todos.Controllers;
using Todos.Data;
using Todos.Services;

namespace TodosTests;

// Unit tests: the controller alone, its service mocked.
public class TodosControllerTests
{
    private Mock<ITodoService> service;
    private TodosController controller;

    [SetUp]
    public void SetUp()
    {
        service = new Mock<ITodoService>();
        controller = new TodosController(service.Object);
    }

    [TearDown]
    public void TearDown() => controller.Dispose();

    [Test]
    public async Task IndexPassesTodosToTheView()
    {
        var todos = new List<Todo>
        {
            new() { Id = 1, Title = "Write tests" },
        };
        service.Setup(s => s.GetAllAsync()).ReturnsAsync(todos);

        var result = await controller.Index() as ViewResult;

        Assert.That(result!.Model, Is.SameAs(todos));
    }

    [Test]
    public async Task CreateAddsAndRedirects()
    {
        var result = await controller.Create("Buy milk") as RedirectToActionResult;

        Assert.That(result!.ActionName, Is.EqualTo(nameof(TodosController.Index)));
        service.Verify(s => s.AddAsync("Buy milk"), Times.Once);
    }

    [TestCase(null)]
    [TestCase("   ")]
    public async Task CreateRejectsBlankTitleWithoutTouchingTheService(string title)
    {
        Assert.That(await controller.Create(title), Is.TypeOf<BadRequestObjectResult>());
        service.VerifyNoOtherCalls();
    }

    [Test]
    public async Task CompleteUnknownIsNotFound()
    {
        service.Setup(s => s.CompleteAsync(It.IsAny<int>())).ReturnsAsync(false);

        Assert.That(await controller.Complete(5), Is.TypeOf<NotFoundResult>());
    }
}
