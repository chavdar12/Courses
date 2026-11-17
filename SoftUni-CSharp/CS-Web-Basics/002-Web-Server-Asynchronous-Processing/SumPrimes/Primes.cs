namespace SumPrimes;

public static class Primes
{
    public static long SumInRange(int start, int end)
    {
        long sum = 0;
        for (var n = Math.Max(start, 2); n <= end; n++)
        {
            if (IsPrime(n))
                sum += n;
        }

        return sum;
    }

    private static bool IsPrime(int n)
    {
        for (var d = 2; d * d <= n; d++)
        {
            if (n % d == 0)
                return false;
        }

        return true;
    }
}
