namespace Tests;

public class ProgramTests
{
    [TestCase("3\nTomatoes\nPotatoes\nBread", "1.Bread\n2.Potatoes\n3.Tomatoes")]
    public void Program_PrintsExpectedOutput(string input, string expected)
    {
        Assert.That(ConsoleRunner.Run("Ex002", input), Is.EqualTo(expected));
    }
}