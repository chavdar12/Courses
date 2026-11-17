namespace Ex006;

internal class Program
{
    private static void Main(string[] args)
    {
        var list = new DoublyLinkedList<int>();
        list.AddFirst(3);
        list.AddFirst(0);
        list.AddLast(30);
        list.AddLast(42);
        list.RemoveLast();

        foreach (var item in list)
            Console.WriteLine(item);

        Console.WriteLine($"Sum: {list.Sum()}");
    }
}
