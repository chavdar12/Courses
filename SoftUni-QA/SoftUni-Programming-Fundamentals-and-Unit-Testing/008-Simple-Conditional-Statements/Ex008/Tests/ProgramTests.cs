namespace Tests;

public class ProgramTests
{
    [TestCase("student", "$1.00")]
    [TestCase("regular", "$1.60")]
    [TestCase("vip", "Invalid ticket type!")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex008", input), Is.EqualTo(expected));
    }
}