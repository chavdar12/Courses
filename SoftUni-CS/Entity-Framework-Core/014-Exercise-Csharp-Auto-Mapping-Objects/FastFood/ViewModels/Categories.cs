using System.ComponentModel.DataAnnotations;

namespace FastFood.ViewModels;

public class CreateCategoryInputModel
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string CategoryName { get; set; }
}

public class CategoryAllViewModel
{
    public string Name { get; set; }
}
