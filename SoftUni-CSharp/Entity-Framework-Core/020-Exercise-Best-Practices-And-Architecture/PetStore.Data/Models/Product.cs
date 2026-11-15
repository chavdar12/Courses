using PetStore.Data.Models.Enums;

namespace PetStore.Data.Models;

public class Product
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ProductType Type { get; set; }

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public int DistributorId { get; set; }

    public Distributor Distributor { get; set; }

    public ICollection<Purchase> Purchases { get; set; } = new HashSet<Purchase>();
}
