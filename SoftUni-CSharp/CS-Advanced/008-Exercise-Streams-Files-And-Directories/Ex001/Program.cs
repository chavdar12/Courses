namespace Ex001;

internal class Program
{
    private static void Main(string[] args)
    {
        var input = args.Length > 0 ? args[0] : "copyMe.png";
        var output = args.Length > 1 ? args[1] : "copyMe-copy.png";

        using var source = new FileStream(input, FileMode.Open);
        using var destination = new FileStream(output, FileMode.Create);
        var buffer = new byte[4096];
        int read;
        while ((read = source.Read(buffer, 0, buffer.Length)) > 0)
            destination.Write(buffer, 0, read);
    }
}
