using Microsoft.AspNetCore.Mvc;

namespace Advanced.Areas.Admin.Controllers;

// Areas split big apps into sections, each with its own controllers/views: /Admin/Dashboard.
[Area("Admin")]
public class DashboardController : Controller
{
    public IActionResult Index() =>
        Content($"Admin dashboard ({Url.Action("Index", "Home", new { area = "" })} is the public site)");
}
