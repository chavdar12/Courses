using System.ComponentModel.DataAnnotations;
using FastFood.Models.Enums;

namespace FastFood.ViewModels;

public class CreateOrderInputModel
{
    [Required]
    public string Customer { get; set; }

    public int ItemId { get; set; }

    public int EmployeeId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }

    public OrderType Type { get; set; }
}

public class CreateOrderViewModel
{
    public List<int> Items { get; set; }

    public List<int> Employees { get; set; }
}

public class OrderAllViewModel
{
    public int OrderId { get; set; }

    public string Customer { get; set; }

    public string Employee { get; set; }

    public DateTime DateTime { get; set; }
}
