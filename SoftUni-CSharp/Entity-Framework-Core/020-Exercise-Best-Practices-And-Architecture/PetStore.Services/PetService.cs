using PetStore.Data;
using PetStore.Data.Models;
using PetStore.Data.Models.Enums;

namespace PetStore.Services;

public class PetService(PetStoreDbContext context, ClientService clients)
{
    public int Add(string name, string breed, Gender gender, DateTime birthDate, decimal price)
    {
        var pet = new Pet
        {
            Name = name,
            Breed = breed,
            Gender = gender,
            BirthDate = birthDate,
            Price = price,
        };
        context.Pets.Add(pet);
        context.SaveChanges();

        return pet.Id;
    }

    public IReadOnlyList<Pet> Available() => context.Pets.Where(p => !p.IsSold).OrderBy(p => p.Name).ToList();

    public decimal Sell(int petId, int clientId, DateTime date)
    {
        var pet = context.Pets.Find(petId) ?? throw new ArgumentException($"Pet {petId} does not exist.");
        if (pet.IsSold)
        {
            throw new InvalidOperationException($"{pet.Name} is already sold.");
        }

        var price = clients.ApplyDiscount(clientId, pet.Price);
        pet.IsSold = true;
        context.Sales.Add(
            new Sale
            {
                ClientId = clientId,
                PetId = petId,
                Quantity = 1,
                Price = price,
                Date = date,
            }
        );
        context.SaveChanges();

        return price;
    }
}
