using PetStore.Data;
using PetStore.Data.Models;
using PetStore.Data.Models.Enums;

namespace PetStore.Services;

public class ProductService(PetStoreDbContext context, ClientService clients)
{
    // Buys goods from a distributor; new products and distributors are created on the fly.
    public int Buy(
        string distributorName,
        string productName,
        ProductType type,
        int quantity,
        decimal unitCost,
        decimal sellPrice,
        DateTime date
    )
    {
        if (quantity <= 0 || unitCost < 0 || sellPrice < 0)
        {
            throw new ArgumentException("Quantity must be positive and prices cannot be negative.");
        }

        var product = context.Products.SingleOrDefault(p => p.Name == productName);
        if (product == null)
        {
            var distributor =
                context.Distributors.SingleOrDefault(d => d.Name == distributorName)
                ?? new Distributor { Name = distributorName };
            product = new Product
            {
                Name = productName,
                Type = type,
                Distributor = distributor,
            };
            context.Products.Add(product);
        }

        product.Price = sellPrice;
        product.Quantity += quantity;
        product.Purchases.Add(
            new Purchase
            {
                Quantity = quantity,
                UnitCost = unitCost,
                Date = date,
            }
        );
        context.SaveChanges();

        return product.Id;
    }

    public decimal Sell(int clientId, int productId, int quantity, DateTime date)
    {
        var product =
            context.Products.Find(productId) ?? throw new ArgumentException($"Product {productId} does not exist.");
        if (quantity <= 0 || quantity > product.Quantity)
        {
            throw new InvalidOperationException(
                $"Cannot sell {quantity} x {product.Name}, {product.Quantity} in stock."
            );
        }

        var price = clients.ApplyDiscount(clientId, product.Price * quantity);
        product.Quantity -= quantity;
        context.Sales.Add(
            new Sale
            {
                ClientId = clientId,
                ProductId = productId,
                Quantity = quantity,
                Price = price,
                Date = date,
            }
        );
        context.SaveChanges();

        return price;
    }
}
