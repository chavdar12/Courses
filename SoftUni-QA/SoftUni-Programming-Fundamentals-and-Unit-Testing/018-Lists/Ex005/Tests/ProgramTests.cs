namespace Tests;

public class ProgramTests
{
    [TestCase("2 13 43 876 342 23 543\nContains 100\nContains 543\nPrintEven\nPrintOdd\nGetSum\nFilter >= 43\nend",
        "No such number\nYes\n2 876 342 \n13 43 23 543 \n1842\n43 876 342 543")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}