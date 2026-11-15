using Microsoft.EntityFrameworkCore;
using MusicHub;
using MusicHub.Data;
using MusicHub.Data.Models;
using MusicHub.Data.Models.Enums;

namespace MusicHubTests;

public class StartUpTests
{
    private MusicHubDbContext context;

    [SetUp]
    public void SetUp()
    {
        context = new MusicHubDbContext(new DbContextOptionsBuilder<MusicHubDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

        var producer = new Producer { Id = 9, Name = "Evgeni Dimitrov" };
        var other = new Producer { Id = 2, Name = "Georgi Milkov" };
        var kara = new Writer { Name = "Kara-lynn Sharpous" };
        var stanford = new Writer { Name = "Stanford Daykin" };
        var lula = new Performer { FirstName = "Lula", LastName = "Zuan" };
        var abe = new Performer { FirstName = "Abe", LastName = "Zed" };

        var devils = new Album { Name = "Devil's advocate", ReleaseDate = new DateTime(2018, 7, 21), Producer = producer };
        devils.Songs.Add(Song("Numb", 13.99m, 180, kara));
        devils.Songs.Add(Song("Ibuprofen", 26.50m, 335, stanford, lula, abe));
        var cheap = new Album { Name = "Cheap", ReleaseDate = new DateTime(2019, 1, 2), Producer = producer };
        cheap.Songs.Add(Song("Away", 5m, 243, stanford, lula));
        var foreign = new Album { Name = "Foreign", ReleaseDate = new DateTime(2020, 1, 1), Producer = other };
        foreign.Songs.Add(Song("Bentasil", 99m, 3, kara));

        context.Albums.AddRange(cheap, devils, foreign);
        context.SaveChanges();
        context.ChangeTracker.Clear();
    }

    [TearDown]
    public void TearDown() => context.Dispose();

    [Test]
    public void ExportAlbumsInfoSortsAlbumsByPriceAndSongsByNameDescending()
    {
        Assert.That(StartUp.ExportAlbumsInfo(context, 9), Is.EqualTo("""
            -AlbumName: Devil's advocate
            -ReleaseDate: 07/21/2018
            -ProducerName: Evgeni Dimitrov
            -Songs:
            ---#1
            ---SongName: Numb
            ---Price: 13.99
            ---Writer: Kara-lynn Sharpous
            ---#2
            ---SongName: Ibuprofen
            ---Price: 26.50
            ---Writer: Stanford Daykin
            -AlbumPrice: 40.49
            -AlbumName: Cheap
            -ReleaseDate: 01/02/2019
            -ProducerName: Evgeni Dimitrov
            -Songs:
            ---#1
            ---SongName: Away
            ---Price: 5.00
            ---Writer: Stanford Daykin
            -AlbumPrice: 5.00
            """));
    }

    [Test]
    public void ExportSongsAboveDurationListsEveryPerformer()
    {
        Assert.That(StartUp.ExportSongsAboveDuration(context, 200), Is.EqualTo("""
            -Song #1
            ---SongName: Away
            ---Writer: Stanford Daykin
            ---Performer: Lula Zuan
            ---AlbumProducer: Evgeni Dimitrov
            ---Duration: 00:04:03
            -Song #2
            ---SongName: Ibuprofen
            ---Writer: Stanford Daykin
            ---Performer: Abe Zed
            ---Performer: Lula Zuan
            ---AlbumProducer: Evgeni Dimitrov
            ---Duration: 00:05:35
            """));
    }

    [Test]
    public void AlbumPriceIsTheSumOfItsSongs()
    {
        Assert.That(context.Albums.Include(a => a.Songs).Single(a => a.Name == "Devil's advocate").Price, Is.EqualTo(40.49m));
    }

    private static Song Song(string name, decimal price, int seconds, Writer writer, params Performer[] performers)
    {
        var song = new Song { Name = name, Price = price, Duration = TimeSpan.FromSeconds(seconds), Writer = writer, Genre = Genre.Rock, CreatedOn = DateTime.Today };
        foreach (var performer in performers)
        {
            song.SongPerformers.Add(new SongPerformer { Performer = performer });
        }

        return song;
    }
}
