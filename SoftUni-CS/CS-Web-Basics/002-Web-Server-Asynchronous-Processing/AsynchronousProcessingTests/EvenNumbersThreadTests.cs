namespace AsynchronousProcessingTests;

public class EvenNumbersThreadTests
{
    private static readonly System.Reflection.Assembly Program = System.Reflection.Assembly.Load("EvenNumbersThread");

    [Test]
    public void PrintsEvensThenFinishes()
    {
        Assert.That(ConsoleRunner.Run(Program, "1 10"), Is.EqualTo("2\n4\n6\n8\n10\nThread finished work"));
    }

    [Test]
    public void IncludesEvenStartAndHandlesNegatives()
    {
        Assert.That(ConsoleRunner.Run(Program, "-4 2"), Is.EqualTo("-4\n-2\n0\n2\nThread finished work"));
    }
}
