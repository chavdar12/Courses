// Slides problem "Even Numbers Thread": print the even numbers of a range on a separate thread.
var range = Console.ReadLine()!.Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();

var evens = new Thread(() => PrintEvenNumbers(range[0], range[1]));
evens.Start();
evens.Join();

Console.WriteLine("Thread finished work");

static void PrintEvenNumbers(int start, int end)
{
    for (var i = start + Math.Abs(start % 2); i <= end; i += 2)
    {
        Console.WriteLine(i);
    }
}
