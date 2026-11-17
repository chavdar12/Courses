using BlazorApp.Components.Pages;
using BlazorApp.Services;
using Bunit;
using Microsoft.Extensions.DependencyInjection;

namespace BlazorAppTests;

public class ComponentTests
{
    private BunitContext ctx;

    [SetUp]
    public void SetUp() => ctx = new BunitContext();

    [TearDown]
    public void TearDown() => ctx.Dispose();

    [Test]
    public void CounterIncrementsAndCallsJs()
    {
        var setTitle = ctx.JSInterop.SetupVoid("setTitle", _ => true);
        var counter = ctx.Render<Counter>();

        counter.Find("button.increment").Click();
        counter.Find("button.increment").Click();

        Assert.That(counter.Find("p[role=status]").TextContent, Is.EqualTo("Current count: 2"));
        Assert.That(setTitle.Invocations.Last().Arguments.Single(), Is.EqualTo("Count 2"));
    }

    [Test]
    public void CounterHonoursStepParameter()
    {
        ctx.JSInterop.Mode = JSRuntimeMode.Loose;
        var counter = ctx.Render<Counter>(p => p.Add(c => c.Step, 5));

        counter.Find("button.increment").Click();

        Assert.That(counter.Find("p[role=status]").TextContent, Is.EqualTo("Current count: 5"));
    }

    [Test]
    public void TodoFormBindsValidatesAndAdds()
    {
        var page = ctx.Render<Todos>();

        page.Find("form").Submit();
        Assert.That(page.Find(".validation-message").TextContent, Is.EqualTo("Title is required."));

        page.Find("#title").Change("Learn Blazor");
        page.Find("form").Submit();

        Assert.That(page.FindAll("li"), Has.Count.EqualTo(1));
        Assert.That(page.Find("h1").TextContent, Is.EqualTo("Todos (1 left)"));
        Assert.That(page.Find("#title").GetAttribute("value"), Is.Empty.Or.Null);
    }

    [Test]
    public void CheckingATodoUpdatesTheCount()
    {
        var page = ctx.Render<Todos>();
        page.Find("#title").Change("Ship");
        page.Find("form").Submit();

        page.Find("input[type=checkbox]").Change(true);

        Assert.That(page.Find("h1").TextContent, Is.EqualTo("Todos (0 left)"));
    }

    [Test]
    public void WeatherShowsLoadingThenData()
    {
        var pending = new TaskCompletionSource<IReadOnlyList<Forecast>>();
        ctx.Services.AddSingleton<IWeatherService>(new FakeWeather(pending.Task));

        var page = ctx.Render<Weather>();
        Assert.That(page.Markup, Does.Contain("Loading..."));

        pending.SetResult([new Forecast(new DateOnly(2026, 1, 1), 21, "Mild")]);

        page.WaitForAssertion(() => Assert.That(page.Find("tbody td:last-child").TextContent, Is.EqualTo("Mild")));
    }

    private class FakeWeather(Task<IReadOnlyList<Forecast>> result) : IWeatherService
    {
        public Task<IReadOnlyList<Forecast>> GetAsync() => result;
    }
}
