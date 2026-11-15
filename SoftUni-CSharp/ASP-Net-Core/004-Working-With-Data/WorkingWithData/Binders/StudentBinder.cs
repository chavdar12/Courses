using Microsoft.AspNetCore.Mvc.ModelBinding;
using WorkingWithData.Models;

namespace WorkingWithData.Binders;

// Binds "Name-Age" (e.g. ?student=Ivan-21) into a Student.
public class StudentBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        var raw = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).FirstValue;
        if (raw is null)
        {
            return Task.CompletedTask;
        }

        var parts = raw.Split('-');
        if (parts.Length != 2 || !int.TryParse(parts[1], out var age))
        {
            bindingContext.ModelState.AddModelError(bindingContext.ModelName, "Expected format Name-Age.");
            return Task.CompletedTask;
        }

        bindingContext.Result = ModelBindingResult.Success(new Student { Name = parts[0], Age = age });
        return Task.CompletedTask;
    }
}

public class StudentBinderProvider : IModelBinderProvider
{
    public IModelBinder GetBinder(ModelBinderProviderContext context) =>
        context.Metadata.ModelType == typeof(Student) ? new StudentBinder() : null;
}
