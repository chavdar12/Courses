using System.ComponentModel.DataAnnotations;

namespace FastFood.ViewModels;

public class RegisterEmployeeInputModel
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Name { get; set; }

    [Range(15, 80)]
    public int Age { get; set; }

    public int PositionId { get; set; }

    [Required]
    [StringLength(30, MinimumLength = 3)]
    public string Address { get; set; }
}

public class RegisterEmployeeViewModel
{
    public int PositionId { get; set; }

    public string PositionName { get; set; }
}

public class EmployeesAllViewModel
{
    public string Name { get; set; }

    public int Age { get; set; }

    public string Address { get; set; }

    public string Position { get; set; }
}
