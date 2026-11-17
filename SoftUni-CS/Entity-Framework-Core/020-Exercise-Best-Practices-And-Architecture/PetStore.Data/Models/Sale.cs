using PetStore.Data.Models.Enums;

namespace PetStore.Data.Models;

// One sale: a product, a pet or a grooming session, and who bought it for how much.
public class Sale
{
    public int Id { get; set; }

    public int ClientId { get; set; }

    public Client Client { get; set; }

    public int? ProductId { get; set; }

    public Product Product { get; set; }

    public int Quantity { get; set; }

    public int? PetId { get; set; }

    public Pet Pet { get; set; }

    public GroomingService Grooming { get; set; }

    public decimal Price { get; set; }

    public DateTime Date { get; set; }
}
