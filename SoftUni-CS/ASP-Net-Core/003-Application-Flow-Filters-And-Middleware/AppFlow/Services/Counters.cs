namespace AppFlow.Services;

public abstract class Counter
{
    public Guid Id { get; } = Guid.NewGuid();
}

public class TransientCounter : Counter;

public class ScopedCounter : Counter;

public class SingletonCounter : Counter;
