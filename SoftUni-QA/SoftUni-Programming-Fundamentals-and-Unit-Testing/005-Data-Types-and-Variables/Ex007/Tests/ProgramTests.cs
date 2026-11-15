namespace Tests;

public class ProgramTests
{
    [TestCase("Sanya\n4", "The architect Sanya will need 12 hours to complete 4 project/s.")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex007", input), Is.EqualTo(expected));
    }
}