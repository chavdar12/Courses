namespace TestAutomationArchitecture.Pages
{
    public abstract class BasePage
    {
        protected readonly IWebDriver driver;

        protected readonly WebDriverWait wait;

        protected BasePage(IWebDriver driver)
        {
            this.driver = driver;
            wait = new WebDriverWait(driver, Settings.Timeout);
        }

        protected abstract string Path { get; }

        public string Url => Settings.BaseUrl + Path;

        public void Open()
        {
            driver.Navigate().GoToUrl(Url);
        }

        public bool IsOpen()
        {
            return driver.Url.StartsWith(Url);
        }

        protected IWebElement FindElement(By by)
        {
            return wait.Until(ExpectedConditions.ElementIsVisible(by));
        }

        protected void Type(By by, string text)
        {
            var element = FindElement(by);
            element.Clear();
            element.SendKeys(text);
        }

        protected void Click(By by)
        {
            FindElement(by).Click();
        }

        protected string GetText(By by)
        {
            return FindElement(by).Text.Trim();
        }
    }
}
