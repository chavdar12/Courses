using SumPrimes;

// Slides demo "Sum Primes in Range": the sum runs on a Task, so the console keeps reading commands meanwhile.
// Input: "<start> <end>", then commands: "show" prints the sum once it is ready, "exit" quits.
var range = Console.ReadLine()!.Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();
var sum = Task.Run(() => Primes.SumInRange(range[0], range[1]));

string command;
while ((command = Console.ReadLine()) != null && command != "exit")
{
    if (command == "show")
    {
        Console.WriteLine(sum.IsCompleted ? sum.Result.ToString() : "Still calculating...");
    }
}
