package dsa.bigo;

import java.util.ArrayList;
import java.util.List;

/** Small functions whose running time is the point: each one notes its Big O. */
public final class Complexity {
    private Complexity() {}

    /** O(n): one pass computes both the sum and the product. */
    public static long[] sumAndProduct(int[] numbers) {
        long sum = 0;
        long product = 1;
        for (int n : numbers) {
            sum += n;
            product *= n;
        }
        return new long[] {sum, product};
    }

    /** O(n^2): every ordered pair of elements. */
    public static List<int[]> allPairs(int[] numbers) {
        List<int[]> pairs = new ArrayList<>();
        for (int a : numbers) {
            for (int b : numbers) {
                pairs.add(new int[] {a, b});
            }
        }
        return pairs;
    }

    /** O(sqrt n): trial division up to the square root. */
    public static boolean isPrime(long n) {
        if (n < 2) {
            return false;
        }
        for (long d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                return false;
            }
        }
        return true;
    }

    /** O(log n): halves n on every step. */
    public static int halvingSteps(int n) {
        if (n < 1) {
            throw new IllegalArgumentException("n must be positive");
        }
        int steps = 0;
        while (n > 1) {
            n /= 2;
            steps++;
        }
        return steps;
    }

    /** O(n) time, O(1) extra space: reverses the array in place. */
    public static void reverse(int[] numbers) {
        for (int i = 0, j = numbers.length - 1; i < j; i++, j--) {
            int tmp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = tmp;
        }
    }
}
