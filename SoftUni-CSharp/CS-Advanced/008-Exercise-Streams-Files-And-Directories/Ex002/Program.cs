namespace Ex002;

internal class Program
{
    private static void Main(string[] args)
    {
        var folder = args.Length > 0 ? args[0] : ".";
        var report =
            args.Length > 1
                ? args[1]
                : Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "report.txt");

        var lines = new DirectoryInfo(folder)
            .GetFiles()
            .GroupBy(f => f.Extension)
            .OrderByDescending(g => g.Count())
            .ThenBy(g => g.Key, StringComparer.Ordinal)
            .SelectMany(g =>
                g.OrderBy(f => f.Length).Select(f => $"--{f.Name} - {f.Length / 1024.0:0.###}kb").Prepend(g.Key)
            );

        File.WriteAllLines(report, lines);
    }
}
