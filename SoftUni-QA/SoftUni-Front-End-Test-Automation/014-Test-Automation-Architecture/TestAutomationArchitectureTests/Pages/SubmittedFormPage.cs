namespace TestAutomationArchitecture.Pages
{
    public class SubmittedFormPage : BasePage
    {
        public SubmittedFormPage(IWebDriver driver) : base(driver)
        {
        }

        protected override string Path => "submitted-form.html";

        private readonly By heading = By.TagName("h1");
        private readonly By message = By.Id("message");

        public string Heading => GetText(heading);

        public string Message => GetText(message);
    }
}
