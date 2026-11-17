using System.Xml;
using System.Xml.Serialization;

namespace ProductShop;

public static class XmlHelper
{
    // shortcut: a serializer built with a root override is not cached by .NET, fine for a console run; cache it if called in a loop.
    public static T Deserialize<T>(string inputXml, string rootName)
    {
        var serializer = new XmlSerializer(typeof(T), new XmlRootAttribute(rootName));
        using var reader = new StringReader(inputXml);
        return (T)serializer.Deserialize(reader)!;
    }

    public static string Serialize<T>(T value, string rootName)
    {
        var serializer = new XmlSerializer(typeof(T), new XmlRootAttribute(rootName));
        var namespaces = new XmlSerializerNamespaces(new[] { XmlQualifiedName.Empty });
        using var writer = new StringWriter();
        serializer.Serialize(writer, value, namespaces);
        return writer.ToString();
    }
}
