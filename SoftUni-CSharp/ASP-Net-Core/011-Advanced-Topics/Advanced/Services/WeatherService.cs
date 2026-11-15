using Microsoft.Extensions.Caching.Memory;

namespace Advanced.Services;

// Pretends to be slow; IMemoryCache keeps the answer for a minute.
public class WeatherService(IMemoryCache cache, ILogger<WeatherService> logger)
{
    public int Calls { get; private set; }

    public string Forecast(string city) =>
        cache.GetOrCreate(
            $"weather:{city}",
            entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1);
                Calls++;
                logger.LogInformation("Cache miss for {City}", city);
                return $"{city}: sunny ({DateTime.UtcNow:O})";
            }
        );
}
