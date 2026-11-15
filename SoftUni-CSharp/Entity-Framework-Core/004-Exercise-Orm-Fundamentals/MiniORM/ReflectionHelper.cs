using System.Reflection;

namespace MiniORM;

internal static class ReflectionHelper
{
    // Auto-properties without a setter can only be replaced through their compiler-generated backing field.
    public static void ReplaceBackingField(object sourceObj, string propertyName, object targetObj)
    {
        var backingField = sourceObj.GetType()
            .GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.SetField)
            .First(f => f.Name == $"<{propertyName}>k__BackingField");

        backingField.SetValue(sourceObj, targetObj);
    }

    public static bool HasAttribute<T>(this MemberInfo member)
        where T : Attribute => member.GetCustomAttribute<T>() != null;
}
