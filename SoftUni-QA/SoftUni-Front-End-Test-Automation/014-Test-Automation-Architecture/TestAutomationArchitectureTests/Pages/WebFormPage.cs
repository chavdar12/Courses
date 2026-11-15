namespace TestAutomationArchitecture.Pages
{
    public class WebFormPage : BasePage
    {
        public WebFormPage(IWebDriver driver) : base(driver)
        {
        }

        protected override string Path => "web-form.html";

        private readonly By textInput = By.Name("my-text");
        private readonly By passwordInput = By.Name("my-password");
        private readonly By textArea = By.Name("my-textarea");
        private readonly By dropdown = By.Name("my-select");
        private readonly By submitButton = By.CssSelector("button[type='submit']");

        public void Fill(FormData data)
        {
            Type(textInput, data.Text);
            Type(passwordInput, data.Password);
            Type(textArea, data.TextArea);
            new SelectElement(FindElement(dropdown)).SelectByText(data.Option);
        }

        public SubmittedFormPage Submit()
        {
            Click(submitButton);
            return new SubmittedFormPage(driver);
        }
    }
}
