namespace PetStore.Services.Models;

public record DistributorStats(int Bought, int Sold)
{
    public double SoldPercentage => Bought == 0 ? 0 : 100.0 * Sold / Bought;
}

public record Report(decimal Revenue, decimal PurchaseCosts, decimal Salaries, IReadOnlyDictionary<string, DistributorStats> Distributors)
{
    public decimal Profit => Revenue - PurchaseCosts - Salaries;

    public bool Meets(decimal goal) => Profit >= goal;

    // Lets the annual report be built by adding up monthly ones.
    public Report Add(Report other) => new(
        Revenue + other.Revenue,
        PurchaseCosts + other.PurchaseCosts,
        Salaries + other.Salaries,
        Distributors.Concat(other.Distributors)
            .GroupBy(d => d.Key)
            .ToDictionary(g => g.Key, g => new DistributorStats(g.Sum(d => d.Value.Bought), g.Sum(d => d.Value.Sold))));
}
