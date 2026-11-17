namespace AppFlow.Services;

public interface IFeatureService
{
    bool IsEnabled(string feature);
}

public class FeatureService(IConfiguration configuration) : IFeatureService
{
    public bool IsEnabled(string feature) => configuration.GetValue<bool>($"Features:{feature}");
}
