namespace Ex002;

public class Person : IComparable<Person>
{
    public string Name { get; set; }
    public int Age { get; set; }

    public int CompareTo(Person other)
    {
        // the spec treats "John 17" and "john 17" as the same person
        var byName = string.Compare(Name, other.Name, StringComparison.OrdinalIgnoreCase);
        if (byName != 0)
            return byName;

        return Age.CompareTo(other.Age) != 0 ? Age.CompareTo(other.Age) : 0;
    }

    public override bool Equals(object? other)
    {
        var compare = (Person)other;
        return string.Equals(Name, compare.Name, StringComparison.OrdinalIgnoreCase) && Age == compare.Age;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(StringComparer.OrdinalIgnoreCase.GetHashCode(Name), Age);
    }
}
