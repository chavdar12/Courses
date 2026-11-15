namespace CarDealer.Models;

public class Car
{
    public int Id { get; set; }

    public string Make { get; set; }

    public string Model { get; set; }

    public long TravelledDistance { get; set; }

    public ICollection<PartCar> PartsCars { get; set; } = new HashSet<PartCar>();

    public ICollection<Sale> Sales { get; set; } = new HashSet<Sale>();
}
