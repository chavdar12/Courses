package dsa.arrays;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/** Array interview questions. */
public final class ArrayQuestions {
    private ArrayQuestions() {}

    /** The one number of 1..n missing from {@code numbers}. */
    public static int missingNumber(int[] numbers, int n) {
        if (numbers.length != n - 1) {
            throw new IllegalArgumentException("expected " + (n - 1) + " numbers");
        }
        long expected = (long) n * (n + 1) / 2;
        long actual = 0;
        for (int x : numbers) {
            actual += x;
        }
        return (int) (expected - actual);
    }

    /** Indices of two numbers adding up to target, or an empty array. */
    public static int[] twoSum(int[] numbers, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < numbers.length; i++) {
            Integer j = seen.get(target - numbers[i]);
            if (j != null) {
                return new int[] {j, i};
            }
            seen.put(numbers[i], i);
        }
        return new int[0];
    }

    /** Largest product of two different elements; negatives count. */
    public static long maxProduct(int[] numbers) {
        if (numbers.length < 2) {
            throw new IllegalArgumentException("need at least two numbers");
        }
        int[] s = numbers.clone();
        Arrays.sort(s);
        int n = s.length;
        return Math.max((long) s[0] * s[1], (long) s[n - 1] * s[n - 2]);
    }

    public static boolean isUnique(int[] numbers) {
        Set<Integer> seen = new HashSet<>();
        for (int x : numbers) {
            if (!seen.add(x)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isPermutation(int[] a, int[] b) {
        if (a.length != b.length) {
            return false;
        }
        int[] x = a.clone();
        int[] y = b.clone();
        Arrays.sort(x);
        Arrays.sort(y);
        return Arrays.equals(x, y);
    }

    /** Rotates a square matrix 90 degrees clockwise, in place. */
    public static void rotateMatrix(int[][] m) {
        int n = m.length;
        for (int[] row : m) {
            if (row.length != n) {
                throw new IllegalArgumentException("matrix must be square");
            }
        }
        for (int layer = 0; layer < n / 2; layer++) {
            int last = n - 1 - layer;
            for (int i = layer; i < last; i++) {
                int offset = i - layer;
                int top = m[layer][i];
                m[layer][i] = m[last - offset][layer];
                m[last - offset][layer] = m[last][last - offset];
                m[last][last - offset] = m[i][last];
                m[i][last] = top;
            }
        }
    }

    /** Everything except the first and last element. */
    public static int[] middle(int[] numbers) {
        return numbers.length < 2 ? new int[0] : Arrays.copyOfRange(numbers, 1, numbers.length - 1);
    }

    public static long diagonalSum(int[][] m) {
        long sum = 0;
        for (int i = 0; i < m.length; i++) {
            if (m[i].length != m.length) {
                throw new IllegalArgumentException("matrix must be square");
            }
            sum += m[i][i];
        }
        return sum;
    }

    /** The two highest distinct scores, highest first. */
    public static int[] bestTwo(int[] scores) {
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        for (int s : scores) {
            if (s > first) {
                second = first;
                first = s;
            } else if (s > second && s < first) {
                second = s;
            }
        }
        if (Arrays.stream(scores).distinct().count() < 2) {
            throw new IllegalArgumentException("need at least two distinct scores");
        }
        return new int[] {first, second};
    }

    /** Drops repeated values, keeping the first occurrence of each. */
    public static int[] removeDuplicates(int[] numbers) {
        return Arrays.stream(numbers).distinct().toArray();
    }

    /** Best profit from one buy followed by one sell; 0 if prices only fall. */
    public static int maxProfit(int[] prices) {
        int min = Integer.MAX_VALUE;
        int best = 0;
        for (int p : prices) {
            min = Math.min(min, p);
            best = Math.max(best, p - min);
        }
        return best;
    }
}
