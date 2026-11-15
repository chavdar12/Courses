namespace Tests;

public class ProgramTests
{
    [TestCase("abc\nmyPass", "Please, enter your password.\nWrong Pass\nPlease enter new password\nWelcome")]
    [TestCase("myPass", "Please, enter your password.\nWelcome")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex009", input), Is.EqualTo(expected));
    }
}