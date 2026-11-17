using System.Diagnostics;

namespace Chronometer;

// Stopwatch counts in the background on its own, so the console never blocks while time runs.
public class Chronometer : IChronometer
{
    private readonly Stopwatch stopwatch = new();

    public string GetTime =>
        $"{stopwatch.Elapsed.Minutes:D2}:{stopwatch.Elapsed.Seconds:D2}:{stopwatch.Elapsed.Milliseconds:D3}";

    public List<string> Laps { get; } = new();

    public void Start() => stopwatch.Start();

    public void Stop() => stopwatch.Stop();

    public string Lap()
    {
        var lap = GetTime;
        Laps.Add(lap);
        return lap;
    }

    public void Reset()
    {
        stopwatch.Reset();
        Laps.Clear();
    }
}
