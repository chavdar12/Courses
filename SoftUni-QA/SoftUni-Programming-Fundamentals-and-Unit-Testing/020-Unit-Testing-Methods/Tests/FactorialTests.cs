using NUnit.Framework;

namespace TestApp.UnitTests;

public class FactorialTests
{
    [Test]
    public void Test_CalculateFactorial_InputZero_ReturnsOne()
    {
        //arrange
        var input = 0;

        //act
        var result = Factorial.CalculateFactorial(input);
        //assert
        Assert.AreEqual(1, result);
    }

    [Test]
    public void Test_CalculateFactorial_InputPositiveNumber_ReturnsCorrectFactorial()
    {
        //arrange
        var input = 3;

        //act
        var result = Factorial.CalculateFactorial(input);
        //assert
        Assert.AreEqual(6, result);
    }

    [Test]
    public void Test_CalculateFactorial_InputNegative_Throws()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => Factorial.CalculateFactorial(-1));
    }
}