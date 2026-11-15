namespace Tests;

public class ProgramTests
{
    [TestCase("MyPass123", "Password is valid")]
    [TestCase("logIn", "Password must be between 6 and 10 characters\nPassword must have at least 2 digits")]
    [TestCase("Pa$s$s", "Password must consist only of letters and digits\nPassword must have at least 2 digits")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex009", input), Is.EqualTo(expected));
    }
}