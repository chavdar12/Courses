using System;
using NUnit.Framework;

namespace TestApp.UnitTests;

public class ReverserTests
{
    [Test]
    public void Test_ReverseStrings_WithEmptyArray_ReturnsEmptyArray()
    {
        // Arrange
        var inputArray = Array.Empty<string>();

        // Act
        var result = Reverser.ReverseStrings(inputArray);

        // Assert
        Assert.That(result, Is.Empty);
    }

    // TODO: finish test
    [Test]
    public void Test_ReverseStrings_WithSingleString_ReturnsReversedString()
    {
        // Arrange
        var singleStringArray = new string[] { "Inception" };

        // Act
        var actualResult = Reverser.ReverseStrings(singleStringArray);
        var expectedResult = new string[] { "noitpecnI" };

        // Assert

        Assert.That(actualResult, Is.EqualTo(expectedResult));
    }

    [Test]
    public void Test_ReverseStrings_WithMultipleStrings_ReturnsReversedStrings()
    {
        var multiStringArray = new string[] { "Sunday", "Monday" };

        // Act
        var actualResult = Reverser.ReverseStrings(multiStringArray);
        var expectedResult = new string[] { "yadnuS", "yadnoM" };

        // Assert

        Assert.That(actualResult, Is.EqualTo(expectedResult));
    }

    [Test]
    public void Test_ReverseStrings_WithSpecialCharacters_ReturnsReversedSpecialCharacters()
    {
        var charStringArray = new string[] { "M@d", "$ollar" };

        // Act
        var actualResult = Reverser.ReverseStrings(charStringArray);
        var expectedResult = new string[] { "d@M", "rallo$" };

        // Assert

        Assert.That(actualResult, Is.EqualTo(expectedResult));
    }
}
