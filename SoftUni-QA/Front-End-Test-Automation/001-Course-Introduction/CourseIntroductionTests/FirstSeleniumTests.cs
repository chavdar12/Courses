using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

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
            var submit = driver.FindElement(By.CssSelector("button[type='submit']"));
            submit.Click();
            // The click loads a new page; until then the old h1 ("Web form") is still there.
            new WebDriverWait(driver, TimeSpan.FromSeconds(10)).Until(
                SeleniumExtras.WaitHelpers.ExpectedConditions.StalenessOf(submit)
            );

            Assert.That(driver.FindElement(By.TagName("h1")).Text, Is.EqualTo("Form submitted"));
            Assert.That(driver.FindElement(By.Id("message")).Text, Is.EqualTo("Received!"));
        }
    }
}
