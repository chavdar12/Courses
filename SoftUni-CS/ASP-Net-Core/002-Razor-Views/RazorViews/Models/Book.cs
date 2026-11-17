using System.ComponentModel.DataAnnotations;

namespace RazorViews.Models;

public class Book
{
    public int Id { get; set; }

    [Required, StringLength(80, MinimumLength = 2)]
    public string Title { get; set; }

    [Required]
    public string Author { get; set; }

    [Range(1, 2000)]
    public int Pages { get; set; }
}
