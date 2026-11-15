namespace Tests;

public class ProgramTests
{
    [TestCase("Peter", "Hello Peter")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}