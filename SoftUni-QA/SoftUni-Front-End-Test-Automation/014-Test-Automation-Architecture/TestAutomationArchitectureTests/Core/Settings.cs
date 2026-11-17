namespace TestAutomationArchitecture.Core
{
    // Configuration layer: one place for environment values, overridable with environment variables.
    public static class Settings
    {
        public static string BaseUrl =>
            Environment.GetEnvironmentVariable("BASE_URL") ?? "https://www.selenium.dev/selenium/web/";

        public static TimeSpan Timeout => TimeSpan.FromSeconds(10);
    }
}
