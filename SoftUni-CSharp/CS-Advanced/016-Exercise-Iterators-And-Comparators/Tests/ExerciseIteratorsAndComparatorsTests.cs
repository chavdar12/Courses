using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class ExerciseIteratorsAndComparatorsTests
{
    private const string Module = "016-Exercise-Iterators-And-Comparators.";

    [Theory]
    [InlineData("Peter 22 Varna\nGeorge 14 Sofia\nEND\n2", "No matches")]
    [InlineData("Peter 22 Varna\nGeorge 22 Varna\nGeorge 22 Varna\nEND\n2", "2 1 3")]
    public void Ex001_ComparingObjects(string input, string expected) =>
        AssertOutput(Module + "Ex001", input, expected);

    [Theory]
    [InlineData("4\nPeter 20\nPetter 20\nGeorge 15\nPeter 21", "4\n4")]
    [InlineData("7\nJohn 17\njohn 17\nStoqn 25\nJohn 18\nJohn 17\nSam 25\nSamm 25", "5\n5")]
    public void Ex002_EqualityLogic(string input, string expected) => AssertOutput(Module + "Ex002", input, expected);

    [Theory]
    [InlineData("1, 2, 3, 4, 5, 6, 7, 8", "1, 3, 5, 7, 8, 6, 4, 2")]
    [InlineData("1, 2, 3, 4, 5", "1, 3, 5, 4, 2")]
    [InlineData("13, 23, 1, -8, 4, 9", "13, 1, 4, 9, -8, 23")]
    public void Ex003_Froggy(string input, string expected) => AssertOutput(Module + "Ex003", input, expected);

    [Theory]
    [InlineData("Create\nPrint\nEND", "Invalid Operation!")]
    [InlineData("Create Stefcho Goshky\nHasNext\nPrint\nMove\nPrint\nEND", "True\nStefcho\nTrue\nGoshky")]
    [InlineData(
        "Create 1 2 3\nHasNext\nMove\nHasNext\nHasNext\nMove\nHasNext\nEND",
        "True\nTrue\nTrue\nTrue\nTrue\nFalse"
    )]
    public void Ex004_ListyIterator(string input, string expected) => AssertOutput(Module + "Ex004", input, expected);

    [Theory]
    [InlineData("Create 1 2 3 4 5\nMove\nPrintAll\nEND", "True\n1 2 3 4 5")]
    [InlineData(
        "Create Stefcho Goshky Peshu\nPrintAll\nMove\nMove\nPrint\nHasNext\nEND",
        "Stefcho Goshky Peshu\nTrue\nTrue\nPeshu\nFalse"
    )]
    public void Ex004_CollectionPrintAll(string input, string expected) =>
        AssertOutput(Module + "Ex004", input, expected);

    [Theory]
    [InlineData("Push 1, 2, 3, 4\nPop\nPop\nEND", "2\n1\n2\n1")]
    [InlineData("Push 1, 2, 3, 4 \nPop\nPush 1\nEND", "1\n3\n2\n1\n1\n3\n2\n1")]
    [InlineData("Push 1, 2, 3, 4 \nPop\nPop\nPop\nPop\nPop\nEND", "No elements")]
    public void Ex005_Stack(string input, string expected) => AssertOutput(Module + "Ex005", input, expected);

    [Fact]
    public void Ex006_CustomLinkedListIsForeachable() =>
        AssertOutput(
            Module + "Ex006",
            "",
            """
            0
            3
            30
            Sum: 33
            """
        );
}
