using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class ExerciseGenericsTests
{
    private const string Module = "014-Exercise-Generics.";

    [Fact]
    public void Ex001_CustomLinkedList() =>
        AssertOutput(
            Module + "Ex001",
            "",
            """
            Count: 3
            0
            3
            30
            Removed:0
            3
            30
            Removed:30
            Count: 1
            3
            """
        );

    [Fact]
    public void Ex002_GenericBoxOfInteger() =>
        AssertOutput(
            Module + "Ex002",
            "3\n7\n123\n42",
            """
            System.Int32: 7
            System.Int32: 123
            System.Int32: 42
            """
        );

    [Fact]
    public void Ex003_GenericBoxOfString() =>
        AssertOutput(
            Module + "Ex003",
            "2\nlife in a box\nbox in a life",
            """
            System.String: life in a box
            System.String: box in a life
            """
        );

    [Theory]
    [InlineData("3\n7.13\n123.22\n42.78\n7.55", "2")]
    [InlineData("3\n1.1\n2.3\n3.2\n1.5", "2")]
    public void Ex004_GenericCountMethodDoubles(string input, string expected) =>
        AssertOutput(Module + "Ex004", input, expected);

    [Theory]
    [InlineData("3\naa\naaa\nbb\naa", "2")]
    [InlineData("1\naaa\naa", "1")]
    public void Ex005_GenericCountMethodStrings(string input, string expected) =>
        AssertOutput(Module + "Ex005", input, expected);

    [Fact]
    public void Ex006_GenericSwapMethodIntegers() =>
        AssertOutput(
            Module + "Ex006",
            "3\n7\n123\n42\n0 2",
            """
            System.Int32: 42
            System.Int32: 123
            System.Int32: 7
            """
        );

    [Fact]
    public void Ex007_GenericSwapMethodStrings() =>
        AssertOutput(
            Module + "Ex007",
            "3\nPeter\nGeorge\nSwap me with Peter\n0 2",
            """
            System.String: Swap me with Peter
            System.String: George
            System.String: Peter
            """
        );

    [Fact]
    public void Ex008_Threeuple() =>
        AssertOutput(
            Module + "Ex008",
            """
            Adam Smith Wallstreet New York
            Mark 18 drunk
            Karren 0.10 USBank
            """,
            """
            Adam Smith -> Wallstreet -> New York
            Mark -> 18 -> True
            Karren -> 0.1 -> USBank
            """
        );

    [Fact]
    public void Ex009_Tuple() =>
        AssertOutput(
            Module + "Ex009",
            """
            Adam Smith California
            Mark 2
            23 21.23212321
            """,
            """
            Adam Smith -> California
            Mark -> 2
            23 -> 21.23212321
            """
        );
}
