using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class StreamsFilesAndDirectoriesTests : IDisposable
{
    private const string Module = "007-Streams-Files-And-Directories.";

    private const string Romeo = """
        Two households, both alike in dignity,
        In fair Verona, where we lay our scene,
        From ancient grudge break to new mutiny,
        Where civil blood makes civil hands unclean.
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
    public void Ex001_FolderSizeCountsNestedFilesInMegabytes()
    {
        Directory.CreateDirectory(PathOf("TestFolder/Nested"));
        File.WriteAllBytes(PathOf("TestFolder/a.bin"), new byte[1024 * 1024]);
        File.WriteAllBytes(PathOf("TestFolder/Nested/b.bin"), new byte[512 * 1024]);

        Run(Module + "Ex001", "", PathOf("TestFolder"), PathOf("output.txt"));

        Assert.Equal("1.5", File.ReadAllText(PathOf("output.txt")));
    }

    [Fact]
    public void Ex002_LineNumbers()
    {
        Run(Module + "Ex002", "", Write("input.txt", Romeo), PathOf("output.txt"));

        Assert.Equal(
            [
                "1. Two households, both alike in dignity,",
                "2. In fair Verona, where we lay our scene,",
                "3. From ancient grudge break to new mutiny,",
                "4. Where civil blood makes civil hands unclean.",
            ],
            File.ReadAllLines(PathOf("output.txt"))
        );
    }

    [Fact]
    public void Ex003_MergeFilesInterleavesAndKeepsLeftovers()
    {
        Run(Module + "Ex003", "", Write("input1.txt", "1\n3\n5\n7"), Write("input2.txt", "2\n4"), PathOf("output.txt"));

        Assert.Equal(["1", "2", "3", "4", "5", "7"], File.ReadAllLines(PathOf("output.txt")));
    }

    [Fact]
    public void Ex004_OddLines()
    {
        Run(Module + "Ex004", "", Write("input.txt", Romeo), PathOf("output.txt"));

        Assert.Equal(
            ["In fair Verona, where we lay our scene,", "Where civil blood makes civil hands unclean."],
            File.ReadAllLines(PathOf("output.txt"))
        );
    }

    [Fact]
    public void Ex005_SliceAFileIntoFourParts()
    {
        Run(Module + "Ex005", "", Write("input.txt", "abcdefghij"), dir);

        var parts = Enumerable.Range(1, 4).Select(i => File.ReadAllText(PathOf($"Part-{i}.txt"))).ToArray();
        Assert.Equal(["abc", "def", "ghi", "j"], parts);
    }

    [Fact]
    public void Ex006_WordCountIsCaseInsensitiveAndSortedByFrequency()
    {
        var text = """
            -I was quick to judge him, but it wasn't his fault.
            -Is this some kind of joke?! Is it?
            -Quick, hide here…It is safer.
            """;

        Run(Module + "Ex006", "", Write("words.txt", "quick is fault"), Write("input.txt", text), PathOf("output.txt"));

        Assert.Equal(["is - 3", "quick - 2", "fault - 1"], File.ReadAllLines(PathOf("output.txt")));
    }
}
