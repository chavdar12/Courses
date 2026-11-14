namespace Ex010;

internal class Program
{
    private static void Main(string[] args)
    {
        var n = int.Parse(Console.ReadLine());
        var family = new Family();
        for (var i = 0; i < n; i++)
        {
            var member = Console.ReadLine().Split(" ", StringSplitOptions.RemoveEmptyEntries);
            family.AddMember(new Person(member[0], int.Parse(member[1])));
        }

        Console.WriteLine(family.GetOldestMember());
    }
}
