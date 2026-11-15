using System.ComponentModel.DataAnnotations;

namespace FastFood.Models;

public class Employee
{
    public int Id { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Name { get; set; }

    [Range(15, 80)]
    public int Age { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Address { get; set; }

    public int PositionId { get; set; }

    public Position Position { get; set; }

    public ICollection<Order> Orders { get; set; } = new HashSet<Order>();
}
