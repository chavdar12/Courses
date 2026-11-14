namespace Ex010;

public class Person
{
    public Person()
        : this(1)
    {
    }

    public Person(int age)
        : this("No name", age)
    {
    }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public string Name { get; set; }
    public int Age { get; set; }

    public override string ToString()
    {
        return $"{Name} {Age}";
    }
}
