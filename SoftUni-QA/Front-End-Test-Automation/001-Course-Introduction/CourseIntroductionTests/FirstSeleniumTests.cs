using OpenQA.Selenium;

namespace CourseIntroduction
{
    public class FirstSeleniumTests
    {
        private const string Url = "https://www.selenium.dev/selenium/web/web-form.html";

        private IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            Browser.RequireReachable(Url);

            driver = Browser.Create();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            driver.Navigate().GoToUrl(Url);
        }

        [TearDown]
        public void TearDown()
        {
            driver?.Quit();
            driver?.Dispose();
        }

        [Test]
        public void Test_PageTitle()
        {
            Assert.That(driver.Title, Is.EqualTo("Web form"));
        }

        [Test]
        public void Test_SubmitForm()
        {
            driver.FindElement(By.Name("my-text")).SendKeys("Selenium");
            driver.FindElement(By.CssSelector("button[type='submit']")).Click();

            Assert.That(driver.FindElement(By.TagName("h1")).Text, Is.EqualTo("Form submitted"));
            Assert.That(driver.FindElement(By.Id("message")).Text, Is.EqualTo("Received!"));
        }
    }
}
