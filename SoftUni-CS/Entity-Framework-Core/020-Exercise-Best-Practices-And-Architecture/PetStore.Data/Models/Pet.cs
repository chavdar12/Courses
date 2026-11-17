using PetStore.Data.Models.Enums;

namespace PetStore.Data.Models;

public class Pet
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Breed { get; set; }

    public Gender Gender { get; set; }

    public DateTime BirthDate { get; set; }

    public decimal Price { get; set; }

    public bool IsSold { get; set; }
}
