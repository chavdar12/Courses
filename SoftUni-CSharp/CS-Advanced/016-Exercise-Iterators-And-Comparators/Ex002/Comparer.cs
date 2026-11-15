namespace Ex002;

public class Comparer : IComparer<Person>
{
    public int Compare(Person x, Person y)
    {
        // the spec treats "John 17" and "john 17" as the same person
        var byName = string.Compare(x.Name, y.Name, StringComparison.OrdinalIgnoreCase);
        if (byName != 0)
            return byName;

        return x.Age.CompareTo(y.Age) != 0 ? x.Age.CompareTo(y.Age) : 0;
    }
}
