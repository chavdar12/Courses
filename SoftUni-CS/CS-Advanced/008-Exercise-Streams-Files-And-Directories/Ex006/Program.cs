using System.IO.Compression;

namespace Ex006;

internal class Program
{
    private static void Main(string[] args)
    {
        var file = args.Length > 0 ? args[0] : "copyMe.png";
        var zip = args.Length > 1 ? args[1] : "copyMe.zip";
        var extractTo = args.Length > 2 ? args[2] : "extracted";

        File.Delete(zip); // ZipArchiveMode.Create refuses to overwrite an existing archive
        using (var archive = ZipFile.Open(zip, ZipArchiveMode.Create))
            archive.CreateEntryFromFile(file, Path.GetFileName(file));

        ZipFile.ExtractToDirectory(zip, extractTo, true);
    }
}
