namespace TestAutomationArchitecture.Data
{
    // Test data layer.
    public record FormData(string Text, string Password, string TextArea, string Option);

    public static class FormDataProvider
    {
        public static IEnumerable<FormData> ValidForms()
        {
            yield return new FormData("John", "123456", "Hello", "One");
            yield return new FormData("Jane", "qwerty", "Multi\nline", "Two");
            yield return new FormData("Тест", "парола", "Кирилица", "Three");
        }
    }
}
