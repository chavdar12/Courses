using PetStore.Data;
using PetStore.Data.Models;

namespace PetStore.Services;

public class ClientService(PetStoreDbContext context)
{
    public int Register(string name, bool withClientCard)
    {
        var client = new Client { Name = name, HasClientCard = withClientCard };
        context.Clients.Add(client);
        context.SaveChanges();

        return client.Id;
    }

    public void IssueClientCard(int clientId)
    {
        Find(clientId).HasClientCard = true;
        context.SaveChanges();
    }

    // Client card tiers: the more a card holder has spent, the bigger the discount.
    public int GetDiscountPercent(int clientId)
    {
        if (!Find(clientId).HasClientCard)
        {
            return 0;
        }

        var spent = context.Sales.Where(s => s.ClientId == clientId).Sum(s => s.Price);
        return spent >= 1000 ? 10
            : spent >= 500 ? 5
            : 2;
    }

    internal decimal ApplyDiscount(int clientId, decimal price) =>
        Math.Round(price * (100 - GetDiscountPercent(clientId)) / 100, 2);

    private Client Find(int clientId) =>
        context.Clients.Find(clientId) ?? throw new ArgumentException($"Client {clientId} does not exist.");
}
