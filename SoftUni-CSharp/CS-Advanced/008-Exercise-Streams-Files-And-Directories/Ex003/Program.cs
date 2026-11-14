using System.Text.RegularExpressions;

namespace Ex003;

internal class Program
{
    private static void Main(string[] args)
    {
        using var reader = new StreamReader(args.Length > 0 ? args[0] : "text.txt");
        var index = 0;
        string line;
        while ((line = reader.ReadLine()) != null)
        {
            if (index++ % 2 != 0) continue;

            var words = Regex.Replace(line, @"[-,.!?]", "@").Split(' ', StringSplitOptions.RemoveEmptyEntries);
            Console.WriteLine(string.Join(" ", words.Reverse()));
        }
    }
}
