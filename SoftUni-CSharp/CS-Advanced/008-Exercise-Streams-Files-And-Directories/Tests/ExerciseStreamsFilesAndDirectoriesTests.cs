using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class ExerciseStreamsFilesAndDirectoriesTests : IDisposable
{
    private const string Module = "008-Exercise-Streams-Files-And-Directories.";

    private const string Text = """
        -I was quick to judge him, but it wasn't his fault.
        -Is this some kind of joke?! Is it?
        -Quick, hide here. It is safer.
        """;

    // xUnit creates a fresh instance per test, so every test gets its own folder.
    private readonly string dir = Directory.CreateTempSubdirectory().FullName;

    public void Dispose() => Directory.Delete(dir, true);

    private string PathOf(string name) => Path.Combine(dir, name);

    private string Write(string name, string content)
    {
        File.WriteAllText(PathOf(name), content);
        return PathOf(name);
    }

    [Fact]
    public void Ex001_CopyBinaryFileIsByteForByte()
    {
        var bytes = new byte[10_000];
        new Random(42).NextBytes(bytes);
        File.WriteAllBytes(PathOf("copyMe.png"), bytes);

        Run(Module + "Ex001", "", PathOf("copyMe.png"), PathOf("copy.png"));

        Assert.Equal(bytes, File.ReadAllBytes(PathOf("copy.png")));
    }

    [Fact]
    public void Ex002_DirectoryTraversalGroupsByExtension()
    {
        Directory.CreateDirectory(PathOf("src/Nested"));
        File.WriteAllBytes(PathOf("src/Big.cs"), new byte[2048]);
        File.WriteAllBytes(PathOf("src/Small.cs"), new byte[1018]);
        File.WriteAllBytes(PathOf("src/log.txt"), new byte[6881]);
        File.WriteAllBytes(PathOf("src/App.config"), new byte[191]);
        File.WriteAllBytes(PathOf("src/Nested/Ignored.cs"), new byte[1]);

        Run(Module + "Ex002", "", PathOf("src"), PathOf("report.txt"));

        Assert.Equal(
            [
                ".cs",
                "--Small.cs - 0.994kb",
                "--Big.cs - 2kb",
                ".config",
                "--App.config - 0.187kb",
                ".txt",
                "--log.txt - 6.72kb",
            ],
            File.ReadAllLines(PathOf("report.txt"))
        );
    }

    [Fact]
    public void Ex003_EvenLines() =>
        Assert.Equal(
            """
            fault@ his wasn't it but him@ judge to quick was @I
            safer@ is It here@ hide @Quick@
            """.ReplaceLineEndings("\n"),
            Run(Module + "Ex003", "", Write("text.txt", Text))
        );

    [Fact]
    public void Ex004_LineNumbersCountLettersAndPunctuation()
    {
        Run(Module + "Ex004", "", Write("text.txt", Text), PathOf("output.txt"));

        Assert.Equal(
            [
                "Line 1: -I was quick to judge him, but it wasn't his fault. (37)(4)",
                "Line 2: -Is this some kind of joke?! Is it? (24)(4)",
                "Line 3: -Quick, hide here. It is safer. (22)(4)",
            ],
            File.ReadAllLines(PathOf("output.txt"))
        );
    }

    [Fact]
    public void Ex005_WordCountWritesAndComparesResults()
    {
        var output = Run(
            Module + "Ex005",
            "",
            Write("words.txt", "quick\nis\nfault"),
            Write("text.txt", Text),
            PathOf("actualResults.txt"),
            Write("expectedResult.txt", "is - 3\nquick - 2\nfault - 1")
        );

        Assert.Equal(["is - 3", "quick - 2", "fault - 1"], File.ReadAllLines(PathOf("actualResults.txt")));
        Assert.Equal("Actual results match the expected results.", output);
    }

    [Fact]
    public void Ex006_ZipAndExtractRoundTrips()
    {
        var bytes = new byte[5_000];
        new Random(7).NextBytes(bytes);
        File.WriteAllBytes(PathOf("copyMe.png"), bytes);

        Run(Module + "Ex006", "", PathOf("copyMe.png"), PathOf("copyMe.zip"), PathOf("extracted"));
        Run(Module + "Ex006", "", PathOf("copyMe.png"), PathOf("copyMe.zip"), PathOf("extracted")); // reruns overwrite

        Assert.Equal(bytes, File.ReadAllBytes(PathOf("extracted/copyMe.png")));
    }
}
