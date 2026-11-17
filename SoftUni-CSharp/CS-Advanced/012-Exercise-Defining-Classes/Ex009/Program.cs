namespace Ex009;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine(new Person());
        Console.WriteLine(new Person(25));
        Console.WriteLine(new Person("Peter", 20));
    }
}
