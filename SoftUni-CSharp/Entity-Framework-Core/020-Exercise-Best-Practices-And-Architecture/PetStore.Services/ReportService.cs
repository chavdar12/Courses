using PetStore.Data;
using PetStore.Services.Models;

namespace PetStore.Services;

public class ReportService(PetStoreDbContext context)
{
    public Report GetMonthlyReport(int year, int month)
    {
        var from = new DateTime(year, month, 1);
        var to = from.AddMonths(1);

        var revenue = context.Sales.Where(s => s.Date >= from && s.Date < to).Sum(s => s.Price);
        var purchaseCosts = context.Purchases.Where(p => p.Date >= from && p.Date < to).Sum(p => p.Quantity * p.UnitCost);
        var salaries = context.Employees.Sum(e => e.MonthlySalary);

        var distributors = context.Distributors
            .Select(d => new
            {
                d.Name,
                Bought = d.Products.SelectMany(p => p.Purchases).Where(p => p.Date >= from && p.Date < to).Sum(p => p.Quantity),
                Sold = context.Sales.Where(s => s.Product.DistributorId == d.Id && s.Date >= from && s.Date < to).Sum(s => s.Quantity)
            })
            .ToDictionary(d => d.Name, d => new DistributorStats(d.Bought, d.Sold));

        return new Report(revenue, purchaseCosts, salaries, distributors);
    }

    public Report GetAnnualReport(int year) =>
        Enumerable.Range(1, 12).Select(month => GetMonthlyReport(year, month)).Aggregate((total, month) => total.Add(month));
}
