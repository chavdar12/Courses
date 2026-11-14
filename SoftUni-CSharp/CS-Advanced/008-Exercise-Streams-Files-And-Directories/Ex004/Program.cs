namespace Ex004;

internal class Program
{
    private static void Main(string[] args)
    {
        var input = args.Length > 0 ? args[0] : "text.txt";
        var output = args.Length > 1 ? args[1] : "output.txt";

        var lines = File.ReadAllLines(input).Select((line, i) =>
            $"Line {i + 1}: {line} ({line.Count(char.IsLetter)})({line.Count(char.IsPunctuation)})");
        File.WriteAllLines(output, lines);
    }
}
