package dsa.recursion;

/** Classic recursive functions: a base case, then a smaller call. */
public final class Recursion {
    private Recursion() {}

    public static long factorial(int n) {
        requireNonNegative(n);
        if (n > 20) {
            throw new IllegalArgumentException("n! overflows a long for n > 20");
        }
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    public static long fibonacci(int n) {
        requireNonNegative(n);
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static int sumOfDigits(int n) {
        requireNonNegative(n);
        return n < 10 ? n : n % 10 + sumOfDigits(n / 10);
    }

    public static long power(long base, int exponent) {
        requireNonNegative(exponent);
        if (exponent == 0) {
            return 1;
        }
        long half = power(base, exponent / 2);
        return exponent % 2 == 0 ? half * half : half * half * base;
    }

    public static int gcd(int a, int b) {
        a = Math.abs(a);
        b = Math.abs(b);
        return b == 0 ? a : gcd(b, a % b);
    }

    public static String toBinary(int n) {
        requireNonNegative(n);
        return n < 2 ? String.valueOf(n) : toBinary(n / 2) + n % 2;
    }

    private static void requireNonNegative(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("must not be negative: " + n);
        }
    }
}
