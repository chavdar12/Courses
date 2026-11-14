using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class IteratorsAndComparatorsTests
{
    private const string Module = "015-Iterators-And-Comparators.";

    [Fact]
    public void Ex001_BookComparatorSortsByTitleThenNewestFirst() => AssertOutput(Module + "Ex001", "", """
        Animal Farm - 2003
        The Documents in the Case - 2002
        The Documents in the Case - 1930
        """);

    [Fact]
    public void Ex002_LibraryKeepsAuthors() => AssertOutput(Module + "Ex002", "", """
        Animal Farm by George Orwell
        The Documents in the Case by Dorothy Sayers, Robert Eustace
        The Documents in the Case by Anonymous
        """);

    [Fact]
    public void Ex003_LibraryIteratorKeepsInsertionOrder() => AssertOutput(Module + "Ex003", "", """
        Animal Farm
        The Documents in the Case
        The Documents in the Case
        """);

    [Fact]
    public void Ex004_ComparableBookSortsByYearThenTitle() => AssertOutput(Module + "Ex004", "", """
        The Documents in the Case - 1930
        The Documents in the Case - 2002
        Animal Farm - 2003
        """);
}
