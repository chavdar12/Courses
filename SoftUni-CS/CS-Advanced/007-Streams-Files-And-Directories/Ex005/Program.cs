namespace Ex005;

internal class Program
{
    private const int Parts = 4;

    private static void Main(string[] args)
    {
        var input = args.Length > 0 ? args[0] : "input.txt";
        var outputFolder = args.Length > 1 ? args[1] : ".";

        using var reader = new FileStream(input, FileMode.Open);
        var partSize = (int)Math.Ceiling(reader.Length / (double)Parts);
        var buffer = new byte[partSize];
        for (var part = 1; part <= Parts; part++)
        {
            var read = reader.Read(buffer, 0, partSize);
            using var writer = new FileStream(Path.Combine(outputFolder, $"Part-{part}.txt"), FileMode.Create);
            writer.Write(buffer, 0, read);
        }
    }
}
