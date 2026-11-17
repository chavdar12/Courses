namespace BlazorApp.Services;

public record Forecast(DateOnly Date, int TemperatureC, string Summary);

public interface IWeatherService
{
    Task<IReadOnlyList<Forecast>> GetAsync();
}

public class WeatherService : IWeatherService
{
    private static readonly string[] Summaries = ["Freezing", "Cool", "Mild", "Warm", "Hot"];

    public async Task<IReadOnlyList<Forecast>> GetAsync()
    {
        await Task.Delay(300); // simulate a slow backend so the loading state is visible
        var today = DateOnly.FromDateTime(DateTime.Today);
        return Enumerable
            .Range(1, 5)
            .Select(i => new Forecast(today.AddDays(i), Random.Shared.Next(-10, 35), Summaries[i - 1]))
            .ToList();
    }
}
