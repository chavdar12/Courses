namespace Ex010;

public class Family
{
    private readonly List<Person> members = new();

    public void AddMember(Person member)
    {
        members.Add(member);
    }

    public Person GetOldestMember()
    {
        return members.MaxBy(m => m.Age);
    }
}
