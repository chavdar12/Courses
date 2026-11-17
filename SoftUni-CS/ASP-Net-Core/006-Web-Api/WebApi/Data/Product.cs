using System.ComponentModel.DataAnnotations;

namespace WebApi.Data;

public class Product
{
    public int Id { get; set; }

    [Required, StringLength(50)]
    public string Name { get; set; }

    [Range(0.01, 100_000)]
    public decimal Price { get; set; }
}
