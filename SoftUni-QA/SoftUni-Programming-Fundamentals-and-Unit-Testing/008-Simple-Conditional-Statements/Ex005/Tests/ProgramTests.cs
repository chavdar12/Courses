namespace Tests;

public class ProgramTests
{
    [TestCase("s3cr3t!", "Welcome")]
    [TestCase("secret", "Wrong password!")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex005", input), Is.EqualTo(expected));
    }
}