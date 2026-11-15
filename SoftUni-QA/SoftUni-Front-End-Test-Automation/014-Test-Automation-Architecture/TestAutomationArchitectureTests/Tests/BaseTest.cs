namespace TestAutomationArchitecture.Tests
{
    public class BaseTest
    {
        protected IWebDriver driver;

        [SetUp]
        public void SetUp()
        {
            Browser.RequireReachable(Settings.BaseUrl + "web-form.html");
            driver = DriverFactory.Create();
        }

        [TearDown]
        public void TearDown()
        {
            driver?.Quit();
            driver?.Dispose();
        }
    }
}
