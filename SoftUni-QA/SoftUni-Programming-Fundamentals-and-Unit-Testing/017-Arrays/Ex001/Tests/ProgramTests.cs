namespace Tests;

public class ProgramTests
{
    [TestCase("1", "Monday")]
    [TestCase("7", "Sunday")]
    [TestCase("8", "Invalid day!")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex001", input), Is.EqualTo(expected));
    }
}