using SumPrimes;

namespace AsynchronousProcessingTests;

public class SumPrimesTests
{
    [TestCase(0, 10, 17)]
    [TestCase(10, 20, 60)]
    [TestCase(0, 10000, 5736396)]
    [TestCase(-5, 1, 0)]
    public void SumsPrimesInRange(int start, int end, long expected)
    {
        Assert.That(Primes.SumInRange(start, end), Is.EqualTo(expected));
    }
}
