using System.Text.RegularExpressions;

namespace Ex006;

internal class Program
{
    private static void Main(string[] args)
    {
        var words = File.ReadAllText(args.Length > 0 ? args[0] : "words.txt").ToLower().Split();
        var text = File.ReadAllText(args.Length > 1 ? args[1] : "input.txt").ToLower();
        var output = args.Length > 2 ? args[2] : "output.txt";

        var tokens = Regex.Matches(text, @"[\w']+").Select(m => m.Value).ToList();
        var counts = words.Where(w => w != "").Distinct()
            .Select(word => (word, count: tokens.Count(t => t == word)))
            .OrderByDescending(x => x.count);

        File.WriteAllLines(output, counts.Select(x => $"{x.word} - {x.count}"));
    }
}
