namespace TestAutomationArchitecture.Core
{
    // Driver layer: tests never create browsers themselves.
    public static class DriverFactory
    {
        public static IWebDriver Create()
        {
            var driver = Browser.Create();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.Zero;
            return driver;
        }
    }
}
