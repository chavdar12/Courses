using System.Xml.Serialization;

namespace ProductShop.DTOs.Export;

[XmlType("Product")]
public class ExportProductInRangeDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("price")]
    public decimal Price { get; set; }

    [XmlElement("buyer")]
    public string Buyer { get; set; }
}

[XmlType("Product")]
public class ExportProductDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("price")]
    public decimal Price { get; set; }
}

[XmlType("User")]
public class ExportUserSoldProductsDto
{
    [XmlElement("firstName")]
    public string FirstName { get; set; }

    [XmlElement("lastName")]
    public string LastName { get; set; }

    [XmlArray("soldProducts")]
    public ExportProductDto[] SoldProducts { get; set; }
}

[XmlType("Category")]
public class ExportCategoryDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("count")]
    public int Count { get; set; }

    [XmlElement("averagePrice")]
    public decimal AveragePrice { get; set; }

    [XmlElement("totalRevenue")]
    public decimal TotalRevenue { get; set; }
}

public class ExportUsersWithProductsDto
{
    [XmlElement("count")]
    public int Count { get; set; }

    [XmlArray("users")]
    public ExportUserWithProductsDto[] Users { get; set; }
}

[XmlType("User")]
public class ExportUserWithProductsDto
{
    [XmlElement("firstName")]
    public string FirstName { get; set; }

    [XmlElement("lastName")]
    public string LastName { get; set; }

    [XmlElement("age")]
    public int? Age { get; set; }

    public ExportSoldProductsDto SoldProducts { get; set; }

    // XmlSerializer convention: leave <age> out for users without one instead of writing xsi:nil.
    public bool ShouldSerializeAge() => Age.HasValue;
}

public class ExportSoldProductsDto
{
    [XmlElement("count")]
    public int Count { get; set; }

    [XmlArray("products")]
    public ExportProductDto[] Products { get; set; }
}
