using System.Xml.Linq;

namespace XmlProcessingTests;

public static class XmlAssert
{
    // Compares XML structurally: both sides are re-printed the same way, so only content counts.
    public static void AreEqual(string expected, string actual) =>
        Assert.That(XDocument.Parse(actual).ToString(), Is.EqualTo(XDocument.Parse(expected).ToString()));
}
