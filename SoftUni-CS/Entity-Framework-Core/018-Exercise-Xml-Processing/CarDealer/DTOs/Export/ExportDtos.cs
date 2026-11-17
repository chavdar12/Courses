using System.Xml.Serialization;

namespace CarDealer.DTOs.Export;

[XmlType("car")]
public class ExportCarWithDistanceDto
{
    [XmlElement("make")]
    public string Make { get; set; }

    [XmlElement("model")]
    public string Model { get; set; }

    [XmlElement("travelled-distance")]
    public long TravelledDistance { get; set; }
}

[XmlType("car")]
public class ExportBmwCarDto
{
    [XmlAttribute("id")]
    public int Id { get; set; }

    [XmlAttribute("model")]
    public string Model { get; set; }

    [XmlAttribute("travelled-distance")]
    public long TravelledDistance { get; set; }
}

// "suplier" is the element name the task's expected output uses.
[XmlType("suplier")]
public class ExportLocalSupplierDto
{
    [XmlAttribute("id")]
    public int Id { get; set; }

    [XmlAttribute("name")]
    public string Name { get; set; }

    [XmlAttribute("parts-count")]
    public int PartsCount { get; set; }
}

[XmlType("car")]
public class ExportCarAttributesDto
{
    [XmlAttribute("make")]
    public string Make { get; set; }

    [XmlAttribute("model")]
    public string Model { get; set; }

    [XmlAttribute("travelled-distance")]
    public long TravelledDistance { get; set; }
}

[XmlType("car")]
public class ExportCarWithPartsDto
{
    [XmlAttribute("make")]
    public string Make { get; set; }

    [XmlAttribute("model")]
    public string Model { get; set; }

    [XmlAttribute("travelled-distance")]
    public long TravelledDistance { get; set; }

    [XmlArray("parts")]
    public ExportPartDto[] Parts { get; set; }
}

[XmlType("part")]
public class ExportPartDto
{
    [XmlAttribute("name")]
    public string Name { get; set; }

    [XmlAttribute("price")]
    public decimal Price { get; set; }
}

[XmlType("customer")]
public class ExportCustomerSalesDto
{
    [XmlAttribute("full-name")]
    public string FullName { get; set; }

    [XmlAttribute("bought-cars")]
    public int BoughtCars { get; set; }

    [XmlAttribute("spent-money")]
    public decimal SpentMoney { get; set; }
}

[XmlType("sale")]
public class ExportSaleDto
{
    [XmlElement("car")]
    public ExportCarAttributesDto Car { get; set; }

    [XmlElement("discount")]
    public decimal Discount { get; set; }

    [XmlElement("customer-name")]
    public string CustomerName { get; set; }

    [XmlElement("price")]
    public decimal Price { get; set; }

    [XmlElement("price-with-discount")]
    public decimal PriceWithDiscount { get; set; }
}
