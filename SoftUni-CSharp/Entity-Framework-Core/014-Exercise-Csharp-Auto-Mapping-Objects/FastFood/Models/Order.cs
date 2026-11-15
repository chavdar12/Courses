using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FastFood.Models.Enums;

namespace FastFood.Models;

public class Order
{
    public int Id { get; set; }

    [Required]
    public string Customer { get; set; }

    public DateTime DateTime { get; set; }

    public OrderType Type { get; set; }

    [NotMapped]
    public decimal TotalPrice => OrderItems.Sum(oi => oi.Item.Price * oi.Quantity);

    public int EmployeeId { get; set; }

    public Employee Employee { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; } = new HashSet<OrderItem>();
}
