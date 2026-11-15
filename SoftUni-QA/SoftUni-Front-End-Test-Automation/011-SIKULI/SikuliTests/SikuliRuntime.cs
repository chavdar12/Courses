using SikuliSharp;

// SikuliX needs a running Java sikulixapi plus a real display to match screen images;
// skip instead of failing where there is none (e.g. headless CI).
public static class SikuliRuntime
{
    public static ISikuliSession RequireSession()
    {
        if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SIKULI_HOME")))
        {
            Assert.Ignore("SIKULI_HOME is not set; SikuliX runtime unavailable.");
        }

        if (Environment.GetEnvironmentVariable("CI") == "true")
        {
            Assert.Ignore("No display available for SikuliX image matching.");
        }

        try
        {
            return Sikuli.CreateSession();
        }
        catch (Exception e)
        {
            Assert.Ignore($"Could not start SikuliX: {e.Message}");
            throw; // unreachable; satisfies the non-nullable return path.
        }
    }

    public static IPattern Image(string name)
    {
        return Patterns.FromFile(Path.Combine(AppContext.BaseDirectory, "Images", name), 0.8f);
    }
}
