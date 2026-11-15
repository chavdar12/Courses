using System.Globalization;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MusicHub.Data;

namespace MusicHub;

public class StartUp
{
    public static void Main()
    {
        CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;

        using var context = new MusicHubDbContext();
        context.Database.EnsureCreated();

        Console.WriteLine(ExportAlbumsInfo(context, 9));
        Console.WriteLine(ExportSongsAboveDuration(context, 4));
    }

    public static string ExportAlbumsInfo(MusicHubDbContext context, int producerId)
    {
        var albums = context.Albums
            .Where(a => a.ProducerId == producerId)
            .Include(a => a.Producer)
            .Include(a => a.Songs).ThenInclude(s => s.Writer)
            .AsNoTracking()
            .ToList()
            // Price is computed in C#, so the albums are sorted after loading.
            .OrderByDescending(a => a.Price);

        var result = new StringBuilder();
        foreach (var album in albums)
        {
            result.AppendLine($"-AlbumName: {album.Name}")
                .AppendLine($"-ReleaseDate: {album.ReleaseDate.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture)}")
                .AppendLine($"-ProducerName: {album.Producer.Name}")
                .AppendLine("-Songs:");

            var songs = album.Songs.OrderByDescending(s => s.Name).ThenBy(s => s.Writer.Name).ToList();
            for (var i = 0; i < songs.Count; i++)
            {
                result.AppendLine($"---#{i + 1}")
                    .AppendLine($"---SongName: {songs[i].Name}")
                    .AppendLine($"---Price: {songs[i].Price:f2}")
                    .AppendLine($"---Writer: {songs[i].Writer.Name}");
            }

            result.AppendLine($"-AlbumPrice: {album.Price:f2}");
        }

        return result.ToString().TrimEnd();
    }

    public static string ExportSongsAboveDuration(MusicHubDbContext context, int duration)
    {
        var songs = context.Songs
            .Where(s => s.Duration > TimeSpan.FromSeconds(duration))
            .Select(s => new
            {
                s.Name,
                Writer = s.Writer.Name,
                Performers = s.SongPerformers
                    .Select(sp => sp.Performer.FirstName + " " + sp.Performer.LastName)
                    .OrderBy(name => name)
                    .ToList(),
                AlbumProducer = s.Album.Producer.Name,
                s.Duration
            })
            .ToList()
            .OrderBy(s => s.Name)
            .ThenBy(s => s.Writer)
            .ThenBy(s => s.Performers.FirstOrDefault())
            .ToList();

        var result = new StringBuilder();
        for (var i = 0; i < songs.Count; i++)
        {
            result.AppendLine($"-Song #{i + 1}")
                .AppendLine($"---SongName: {songs[i].Name}")
                .AppendLine($"---Writer: {songs[i].Writer}");

            foreach (var performer in songs[i].Performers)
            {
                result.AppendLine($"---Performer: {performer}");
            }

            result.AppendLine($"---AlbumProducer: {songs[i].AlbumProducer}")
                .AppendLine($"---Duration: {songs[i].Duration:c}");
        }

        return result.ToString().TrimEnd();
    }
}
