namespace TestAutomationArchitecture.Tests
{
    public class WebFormTests : BaseTest
    {
        [Test]
        public void Test_OpenWebForm()
        {
            var webForm = new WebFormPage(driver);
            webForm.Open();

            Assert.That(webForm.IsOpen(), Is.True);
            Assert.That(driver.Title, Is.EqualTo("Web form"));
        }

        [TestCaseSource(typeof(FormDataProvider), nameof(FormDataProvider.ValidForms))]
        public void Test_SubmitValidForm(FormData data)
        {
            var webForm = new WebFormPage(driver);
            webForm.Open();
            webForm.Fill(data);

            var submitted = webForm.Submit();

            Assert.That(submitted.IsOpen(), Is.True);
            Assert.That(submitted.Heading, Is.EqualTo("Form submitted"));
            Assert.That(submitted.Message, Is.EqualTo("Received!"));
        }
    }
}
