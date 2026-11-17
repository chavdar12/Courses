using System.Text.RegularExpressions;

namespace Ex005;

internal class Program
{
    private static void Main(string[] args)
    {
        var words = File.ReadAllText(args.Length > 0 ? args[0] : "words.txt").ToLower().Split();
        var text = File.ReadAllText(args.Length > 1 ? args[1] : "text.txt").ToLower();
        var actual = args.Length > 2 ? args[2] : "actualResults.txt";
        var expected = args.Length > 3 ? args[3] : "expectedResult.txt";

        var tokens = Regex.Matches(text, @"[\w']+").Select(m => m.Value).ToList();
        var counts = words
            .Where(w => w != "")
            .Distinct()
            .Select(word => (word, count: tokens.Count(t => t == word)))
            .OrderByDescending(x => x.count)
            .Select(x => $"{x.word} - {x.count}")
            .ToArray();

        File.WriteAllLines(actual, counts);
        Console.WriteLine(
            counts.SequenceEqual(File.ReadAllLines(expected))
                ? "Actual results match the expected results."
                : "Actual results differ from the expected results."
        );
    }
}
