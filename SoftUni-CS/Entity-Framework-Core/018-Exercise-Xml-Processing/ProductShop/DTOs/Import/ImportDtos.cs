using System.Xml.Serialization;

namespace ProductShop.DTOs.Import;

[XmlType("User")]
public class ImportUserDto
{
    [XmlElement("firstName")]
    public string FirstName { get; set; }

    [XmlElement("lastName")]
    public string LastName { get; set; }

    [XmlElement("age")]
    public int? Age { get; set; }
}

[XmlType("Product")]
public class ImportProductDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("price")]
    public decimal Price { get; set; }

    [XmlElement("sellerId")]
    public int SellerId { get; set; }

    [XmlElement("buyerId")]
    public int? BuyerId { get; set; }
}

[XmlType("Category")]
public class ImportCategoryDto
{
    [XmlElement("name")]
    public string Name { get; set; }
}

[XmlType("CategoryProduct")]
public class ImportCategoryProductDto
{
    public int CategoryId { get; set; }

    public int ProductId { get; set; }
}
