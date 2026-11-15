using AutoMapper;
using FastFood.Controllers;
using FastFood.Data;
using FastFood.MappingConfiguration;
using FastFood.Models.Enums;
using FastFood.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;

namespace FastFoodTests;

public class ControllersTests
{
    private static readonly MapperConfiguration Configuration = new(cfg => cfg.AddProfile<FastFoodProfile>(), NullLoggerFactory.Instance);

    private FastFoodContext context;
    private IMapper mapper;

    [SetUp]
    public void SetUp()
    {
        context = new FastFoodContext(new DbContextOptionsBuilder<FastFoodContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);
        mapper = Configuration.CreateMapper();
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void ProfileIsValid()
    {
        Assert.That(() => Configuration.AssertConfigurationIsValid(), Throws.Nothing);
    }

    [Test]
    public void PositionsAndCategoriesAreCreatedAndListed()
    {
        Assert.That(new PositionsController(context, mapper).Create(new CreatePositionInputModel { PositionName = "Cashier" }),
            Is.InstanceOf<RedirectToActionResult>());
        new CategoriesController(context, mapper).Create(new CreateCategoryInputModel { CategoryName = "Burgers" });

        Assert.That(new PositionsController(context, mapper).All().Single().Name, Is.EqualTo("Cashier"));
        Assert.That(new CategoriesController(context, mapper).All().Single().Name, Is.EqualTo("Burgers"));
    }

    [Test]
    public void EmployeesShowTheirPositionName()
    {
        new PositionsController(context, mapper).Create(new CreatePositionInputModel { PositionName = "Cook" });
        var controller = new EmployeesController(context, mapper);
        var position = controller.Register().Single();

        controller.Register(new RegisterEmployeeInputModel { Name = "Pesho", Age = 20, Address = "Sofia", PositionId = position.PositionId });

        Assert.That(position.PositionName, Is.EqualTo("Cook"));
        Assert.That(controller.All().Single(), Has.Property(nameof(EmployeesAllViewModel.Position)).EqualTo("Cook")
            .And.Property(nameof(EmployeesAllViewModel.Age)).EqualTo(20));
        Assert.That(controller.Register(new RegisterEmployeeInputModel { Name = "Gosho", Age = 20, Address = "Sofia", PositionId = 42 }),
            Is.InstanceOf<BadRequestObjectResult>());
    }

    [Test]
    public void OrdersAreCreatedWithTheirItem()
    {
        new PositionsController(context, mapper).Create(new CreatePositionInputModel { PositionName = "Cashier" });
        new EmployeesController(context, mapper).Register(new RegisterEmployeeInputModel { Name = "Pesho", Age = 20, Address = "Sofia", PositionId = 1 });
        new CategoriesController(context, mapper).Create(new CreateCategoryInputModel { CategoryName = "Burgers" });
        var items = new ItemsController(context, mapper);
        items.Create(new CreateItemInputModel { Name = "Cheeseburger", Price = 4.50m, CategoryId = items.Create().Single().CategoryId });

        var orders = new OrdersController(context, mapper);
        var choices = orders.Create();
        orders.Create(new CreateOrderInputModel
        {
            Customer = "Gosho", ItemId = choices.Items.Single(), EmployeeId = choices.Employees.Single(), Quantity = 2, Type = OrderType.ToGo
        });

        var order = orders.All().Single();
        Assert.That((order.Customer, order.Employee), Is.EqualTo(("Gosho", "Pesho")));
        Assert.That(items.All().Single().Category, Is.EqualTo("Burgers"));
        Assert.That(context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Item).Single().TotalPrice, Is.EqualTo(9.00m));
    }
}
