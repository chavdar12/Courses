using Newtonsoft.Json.Linq;

namespace JsonProcessingTests;

public static class JsonAssert
{
    // Compares JSON structurally: both sides are re-printed the same way, so only content counts.
    public static void AreEqual(string expected, string actual) =>
        Assert.That(JToken.Parse(actual).ToString(), Is.EqualTo(JToken.Parse(expected).ToString()));
}
