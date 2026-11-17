namespace Ex004;

internal class Program
{
    private static void Main(string[] args)
    {
        var input = args.Length > 0 ? args[0] : "input.txt";
        var output = args.Length > 1 ? args[1] : "output.txt";

        File.WriteAllLines(output, File.ReadLines(input).Where((_, i) => i % 2 == 1));
    }
}
