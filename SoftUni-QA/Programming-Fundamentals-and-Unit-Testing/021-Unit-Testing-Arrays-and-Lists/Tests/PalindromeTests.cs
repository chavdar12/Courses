using System.Collections.Generic;
using NUnit.Framework;

namespace TestApp.UnitTests;

public class PalindromeTests
{
    // TODO: finish test
    [Test]
    public void Test_IsPalindrome_ValidPalindrome_ReturnsTrue()
    {
        // Arrange
        List<string> validPalindrome = new() { "Tenet" };

        // Act
        var actualResult = Palindrome.IsPalindrome(validPalindrome);

        // Assert
        Assert.IsTrue(actualResult);
    }

    // TODO: finish test
    [Test]
    public void Test_IsPalindrome_EmptyList_ReturnsTrue()
    {
        // Arrange
        List<string> emptyList = new();

        // Act
        var actualResult = Palindrome.IsPalindrome(emptyList);

        // Assert
        Assert.IsTrue(actualResult);
    }

    [Test]
    public void Test_IsPalindrome_SingleWord_ReturnsTrue()
    {
        // Arrange
        List<string> randomWord = new() { "zaraz" };

        // Act
        var actualResult = Palindrome.IsPalindrome(randomWord);

        // Assert
        Assert.IsTrue(actualResult);
    }

    [Test]
    public void Test_IsPalindrome_NonPalindrome_ReturnsFalse()
    {
        List<string> notPalindrome = new() { "Something" };

        // Act
        var actualResult = Palindrome.IsPalindrome(notPalindrome);

        // Assert
        Assert.IsFalse(actualResult);
    }

    [Test]
    public void Test_IsPalindrome_MixedCasePalindrome_ReturnsTrue()
    {
        List<string> notPalindrome = new() { "TeNeT" };

        // Act
        var actualResult = Palindrome.IsPalindrome(notPalindrome);

        // Assert
        Assert.IsTrue(actualResult);
    }
}
