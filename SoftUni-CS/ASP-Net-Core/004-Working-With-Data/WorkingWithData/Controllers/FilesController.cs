using Microsoft.AspNetCore.Mvc;

namespace WorkingWithData.Controllers;

[Route("files")]
public class FilesController : Controller
{
    private const long MaxFileSize = 1024 * 1024;

    private readonly string uploads;

    public FilesController(IWebHostEnvironment env, IConfiguration configuration)
    {
        uploads = Path.Combine(env.ContentRootPath, configuration["UploadsPath"]);
        Directory.CreateDirectory(uploads);
    }

    [HttpGet("")]
    public IActionResult List() => Json(Directory.GetFiles(uploads).Select(Path.GetFileName).Order());

    [HttpPost("")]
    [RequestSizeLimit(5 * MaxFileSize)]
    public async Task<IActionResult> Upload(List<IFormFile> files)
    {
        if (files.Count == 0 || files.Any(f => f.Length == 0 || f.Length > MaxFileSize))
        {
            return BadRequest("Send 1+ non-empty files up to 1 MB each.");
        }

        foreach (var file in files)
        {
            // Never trust the client's file name: strip any directory parts.
            await using var stream = System.IO.File.Create(Path.Combine(uploads, Path.GetFileName(file.FileName)));
            await file.CopyToAsync(stream);
        }

        return Ok(files.Select(f => f.FileName));
    }

    [HttpGet("{fileName}")]
    public IActionResult Download(string fileName)
    {
        var path = Path.Combine(uploads, Path.GetFileName(fileName));
        return System.IO.File.Exists(path)
            ? PhysicalFile(path, "application/octet-stream", Path.GetFileName(path))
            : NotFound();
    }
}
