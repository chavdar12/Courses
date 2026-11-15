using NUnit.Framework;
using System;

namespace TestApp.UnitTests;

public class AverageTests
{
    [Test]
    public void Test_CalculateAverage_InputHasOneElement_ShouldReturnSameElement()
    {
        // Arrange
        int[] array = { 42 };

        // Act
        var result = Average.CalculateAverage(array);

        // Assert
        Assert.That(result, Is.EqualTo(42));
    }

    [Test]
    public void Test_CalculateAverage_InputHasPositiveIntegers_ShouldReturnCorrectAverage()
    {
        // Arrange
        int[] array = { 1, 2, 3, 4 };

        // Act
        var result = Average.CalculateAverage(array);

        // Assert
        Assert.That(result, Is.EqualTo(2.5));
    }

    [Test]
    public void Test_CalculateAverage_InputHasNegativeIntegers_ShouldReturnCorrectAverage()
    {
        // Arrange
        int[] array = { -4, -6, -8, -10 };

        // Act
        var result = Average.CalculateAverage(array);
        double expectedResult = -7;

        // Assert
        Assert.AreEqual(expectedResult, result);
    }

    [Test]
    public void Test_CalculateAverage_InputHasMixedIntegers_ShouldReturnCorrectAverage()
    {
        // Arrange
        int[] array = { -1, 2, 5, 3 };

        // Act
        var result = Average.CalculateAverage(array);

        // Assert
        Assert.That(result, Is.EqualTo(2.25));
    }
}