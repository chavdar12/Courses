namespace PetStore.Data.Models;

public class Client
{
    public int Id { get; set; }

    public string Name { get; set; }

    public bool HasClientCard { get; set; }

    public ICollection<Sale> Sales { get; set; } = new HashSet<Sale>();
}
