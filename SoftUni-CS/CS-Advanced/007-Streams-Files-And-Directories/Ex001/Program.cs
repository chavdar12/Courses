namespace Ex001;

internal class Program
{
    private static void Main(string[] args)
    {
        var folder = args.Length > 0 ? args[0] : "TestFolder";
        var output = args.Length > 1 ? args[1] : "output.txt";

        var bytes = new DirectoryInfo(folder).GetFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
        File.WriteAllText(output, (bytes / 1024.0 / 1024.0).ToString());
    }
}
