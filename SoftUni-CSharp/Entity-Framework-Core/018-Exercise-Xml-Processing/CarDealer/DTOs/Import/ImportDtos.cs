using System.Xml.Serialization;

namespace CarDealer.DTOs.Import;

[XmlType("Supplier")]
public class ImportSupplierDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("isImporter")]
    public bool IsImporter { get; set; }
}

[XmlType("Part")]
public class ImportPartDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("price")]
    public decimal Price { get; set; }

    [XmlElement("quantity")]
    public int Quantity { get; set; }

    [XmlElement("supplierId")]
    public int SupplierId { get; set; }
}

[XmlType("Car")]
public class ImportCarDto
{
    [XmlElement("make")]
    public string Make { get; set; }

    [XmlElement("model")]
    public string Model { get; set; }

    [XmlElement("traveledDistance")]
    public long TraveledDistance { get; set; }

    [XmlArray("parts")]
    public ImportCarPartDto[] Parts { get; set; } = Array.Empty<ImportCarPartDto>();
}

[XmlType("partId")]
public class ImportCarPartDto
{
    [XmlAttribute("id")]
    public int Id { get; set; }
}

[XmlType("Customer")]
public class ImportCustomerDto
{
    [XmlElement("name")]
    public string Name { get; set; }

    [XmlElement("birthDate")]
    public DateTime BirthDate { get; set; }

    [XmlElement("isYoungDriver")]
    public bool IsYoungDriver { get; set; }
}

[XmlType("Sale")]
public class ImportSaleDto
{
    [XmlElement("carId")]
    public int CarId { get; set; }

    [XmlElement("customerId")]
    public int CustomerId { get; set; }

    [XmlElement("discount")]
    public decimal Discount { get; set; }
}
