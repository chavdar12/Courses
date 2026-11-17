using System.ComponentModel.DataAnnotations;

namespace FastFood.ViewModels;

public class CreateItemInputModel
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Name { get; set; }

    [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
    public decimal Price { get; set; }

    public int CategoryId { get; set; }
}

public class CreateItemViewModel
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; }
}

public class ItemsAllViewModels
{
    public string Name { get; set; }

    public decimal Price { get; set; }

    public string Category { get; set; }
}
