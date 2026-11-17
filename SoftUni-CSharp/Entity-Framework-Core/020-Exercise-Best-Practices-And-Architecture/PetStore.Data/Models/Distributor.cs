namespace PetStore.Data.Models;

public class Distributor
{
    public int Id { get; set; }

    public string Name { get; set; }

    public ICollection<Product> Products { get; set; } = new HashSet<Product>();
}
