namespace Ex003;

internal class Program
{
    private static void Main(string[] args)
    {
        var first = File.ReadAllLines(args.Length > 0 ? args[0] : "input1.txt");
        var second = File.ReadAllLines(args.Length > 1 ? args[1] : "input2.txt");
        var output = args.Length > 2 ? args[2] : "output.txt";

        var merged = new List<string>();
        for (var i = 0; i < Math.Max(first.Length, second.Length); i++)
        {
            if (i < first.Length) merged.Add(first[i]);
            if (i < second.Length) merged.Add(second[i]);
        }

        File.WriteAllLines(output, merged);
    }
}
