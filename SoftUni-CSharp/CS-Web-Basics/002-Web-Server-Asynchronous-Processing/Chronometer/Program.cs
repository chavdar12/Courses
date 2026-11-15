using Chronometer;

// Commands: start, stop, lap, laps, time, reset, exit.
IChronometer chronometer = new Chronometer.Chronometer();

string command;
while ((command = Console.ReadLine()) != null && command != "exit")
{
    switch (command)
    {
        case "start": chronometer.Start(); break;
        case "stop": chronometer.Stop(); break;
        case "lap": Console.WriteLine(chronometer.Lap()); break;
        case "time": Console.WriteLine(chronometer.GetTime); break;
        case "reset": chronometer.Reset(); break;
        case "laps":
            Console.WriteLine(chronometer.Laps.Count == 0
                ? "Laps: no laps"
                : "Laps:\n" + string.Join("\n", chronometer.Laps.Select((lap, i) => $"{i}. {lap}")));
            break;
    }
}

chronometer.Stop();
