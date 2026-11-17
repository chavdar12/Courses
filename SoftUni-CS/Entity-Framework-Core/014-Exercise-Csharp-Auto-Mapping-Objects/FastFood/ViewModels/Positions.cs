using System.ComponentModel.DataAnnotations;

namespace FastFood.ViewModels;

public class CreatePositionInputModel
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string PositionName { get; set; }
}

public class PositionsAllViewModel
{
    public string Name { get; set; }
}
