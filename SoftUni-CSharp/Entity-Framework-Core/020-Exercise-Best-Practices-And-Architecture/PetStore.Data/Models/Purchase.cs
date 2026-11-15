namespace PetStore.Data.Models;

// Goods bought from a distributor.
public class Purchase
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public Product Product { get; set; }

    public int Quantity { get; set; }

    public decimal UnitCost { get; set; }

    public DateTime Date { get; set; }
}
