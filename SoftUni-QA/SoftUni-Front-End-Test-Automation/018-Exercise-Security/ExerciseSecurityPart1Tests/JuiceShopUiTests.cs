using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace ExerciseSecurityPart1
{
    // OWASP Juice Shop is an intentionally vulnerable demo app published for security practice, so these UI security checks are safe and allowed.
    public class JuiceShopUiTests
    {
        private const string BaseUrl = "https://demo.owasp-juice.shop";

        private IWebDriver driver;

        private WebDriverWait wait;

        [SetUp]
        public void Setup()
        {
            Browser.RequireReachable(BaseUrl);

            driver = Browser.Create();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(15));

            // The welcome banner and cookie notice sit on top of the page; dismiss them via cookies before anything else.
            driver.Navigate().GoToUrl(BaseUrl);
            driver.Manage().Cookies.AddCookie(new Cookie("welcomebanner_status", "dismiss"));
            driver.Manage().Cookies.AddCookie(new Cookie("cookieconsent_status", "dismiss"));
        }

        [TearDown]
        public void TearDown()
        {
            driver?.Quit();
            driver?.Dispose();
        }

        private void SubmitLogin(string email, string password)
        {
            driver.Navigate().GoToUrl(BaseUrl + "/#/login");
            wait.Until(ExpectedConditions.ElementIsVisible(By.Id("email"))).SendKeys(email);
            driver.FindElement(By.Id("password")).SendKeys(password);
            wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("loginButton"))).Click();
        }

        [Test]
        public void Test_LoginWithInvalidCredentials_IsRejected()
        {
            SubmitLogin("nobody@example.com", "wrong-password");

            var error = wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector(".error")));
            Assert.That(error.Text, Is.EqualTo("Invalid email or password."));
        }

        [Test]
        public void Test_LoginForm_IsVulnerableToSqlInjection()
        {
            // Expected failing security test: a hardened login would reject this and keep us on /login.
            // Juice Shop does not sanitise the input, so authentication is bypassed and the app navigates away.
            SubmitLogin("' OR 1=1--", "anything");

            // Success is signalled by the account menu becoming available, i.e. we are logged in.
            var accountMenu = wait.Until(ExpectedConditions.ElementToBeClickable(By.Id("navbarAccount")));
            accountMenu.Click();

            Assert.That(driver.FindElement(By.Id("navbarLogoutButton")).Displayed, Is.True,
                "Login should NOT succeed with an injection payload; this asserts the known vulnerability is present.");
        }

        [Test]
        public void Test_SearchReflectsUserInput()
        {
            // Input-handling check around the search box, the entry point for the DOM XSS challenge.
            driver.Navigate().GoToUrl(BaseUrl + "/#/search");
            wait.Until(ExpectedConditions.ElementToBeClickable(By.CssSelector("#searchQuery mat-icon"))).Click();

            var box = wait.Until(ExpectedConditions.ElementIsVisible(By.Id("mat-input-1")));
            box.SendKeys("apple" + Keys.Enter);

            var results = wait.Until(ExpectedConditions.ElementIsVisible(By.CssSelector(".item-name")));
            Assert.That(results.Text, Does.Contain("Apple"));
        }
    }
}
