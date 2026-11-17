using PetStore.Data;
using PetStore.Data.Models;
using PetStore.Data.Models.Enums;

namespace PetStore.Services;

public class GroomingSalon(PetStoreDbContext context, ClientService clients)
{
    public const int FullSetDiscountPercent = 20;

    public static readonly IReadOnlyDictionary<GroomingService, decimal> Prices = new Dictionary<
        GroomingService,
        decimal
    >
    {
        [GroomingService.TailTrimming] = 10,
        [GroomingService.NailTrimming] = 8,
        [GroomingService.EarCleaning] = 7,
        [GroomingService.Clipping] = 25,
        [GroomingService.Bathing] = 30,
    };

    public static decimal Quote(GroomingService services)
    {
        var price = Prices.Where(p => services.HasFlag(p.Key)).Sum(p => p.Value);
        return services == GroomingService.FullSet ? price * (100 - FullSetDiscountPercent) / 100 : price;
    }

    public decimal Groom(int clientId, GroomingService services, DateTime date)
    {
        if (services == GroomingService.None)
        {
            throw new ArgumentException("Pick at least one grooming service.");
        }

        var price = clients.ApplyDiscount(clientId, Quote(services));
        context.Sales.Add(
            new Sale
            {
                ClientId = clientId,
                Grooming = services,
                Quantity = 1,
                Price = price,
                Date = date,
            }
        );
        context.SaveChanges();

        return price;
    }
}
