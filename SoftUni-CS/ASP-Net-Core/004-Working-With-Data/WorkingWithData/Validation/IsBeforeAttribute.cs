using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace WorkingWithData.Validation;

public class IsBeforeAttribute(string date) : ValidationAttribute
{
    private readonly DateTime limit = DateTime.Parse(date, CultureInfo.InvariantCulture);

    public override bool IsValid(object value) => value is DateTime d && d < limit;
}
