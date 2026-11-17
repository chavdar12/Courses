namespace AsynchronousProcessingTests;

public class ChronometerTests
{
    [Test]
    public void CountsOnlyWhileRunning()
    {
        var chronometer = new Chronometer.Chronometer();
        Assert.That(chronometer.GetTime, Is.EqualTo("00:00:000"));

        chronometer.Start();
        Thread.Sleep(50);
        chronometer.Stop();
        var stopped = chronometer.GetTime;
        Thread.Sleep(50);

        Assert.That(stopped, Is.Not.EqualTo("00:00:000"));
        Assert.That(chronometer.GetTime, Is.EqualTo(stopped), "Time kept running after stop.");
    }

    [Test]
    public void LapRecordsCurrentTimeAndResetClearsEverything()
    {
        var chronometer = new Chronometer.Chronometer();

        var lap = chronometer.Lap();
        Assert.That(chronometer.Laps, Is.EqualTo(new[] { lap }));

        chronometer.Start();
        chronometer.Reset();

        Assert.That(chronometer.Laps, Is.Empty);
        Assert.That(chronometer.GetTime, Is.EqualTo("00:00:000"));
    }

    [Test]
    public void ProgramPrintsLapsAndTime()
    {
        var output = ConsoleRunner.Run(typeof(Chronometer.Chronometer).Assembly, "laps\nlap\nlap\nlaps\ntime\nexit");

        Assert.That(
            output,
            Is.EqualTo("Laps: no laps\n00:00:000\n00:00:000\nLaps:\n0. 00:00:000\n1. 00:00:000\n00:00:000")
        );
    }
}
