package dsa.dp;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * The divide-and-conquer problems again, each answer computed once: top-down (memoized recursion)
 * and bottom-up (a filled table).
 */
public final class DynamicProgramming {
    private DynamicProgramming() {}

    public static long fibonacciTopDown(int n) {
        requireNonNegative(n);
        return fib(n, new HashMap<>());
    }

    private static long fib(int n, Map<Integer, Long> memo) {
        if (n < 2) {
            return n;
        }
        Long known = memo.get(n);
        if (known != null) {
            return known;
        }
        long value = fib(n - 1, memo) + fib(n - 2, memo);
        memo.put(n, value);
        return value;
    }

    public static long fibonacciBottomUp(int n) {
        requireNonNegative(n);
        long prev = 0;
        long curr = 1;
        for (int i = 0; i < n; i++) {
            long next = prev + curr;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    public static long numberFactorTopDown(int n) {
        requireNonNegative(n);
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1);
        return numberFactor(n, memo);
    }

    private static long numberFactor(int n, long[] memo) {
        if (n < 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }
        if (memo[n] < 0) {
            memo[n] =
                    numberFactor(n - 1, memo)
                            + numberFactor(n - 3, memo)
                            + numberFactor(n - 4, memo);
        }
        return memo[n];
    }

    public static long numberFactorBottomUp(int n) {
        requireNonNegative(n);
        long[] ways = new long[n + 1];
        ways[0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int step : new int[] {1, 3, 4}) {
                if (i >= step) {
                    ways[i] += ways[i - step];
                }
            }
        }
        return ways[n];
    }

    public static long houseRobberBottomUp(int[] houses) {
        long skipLast = 0; // best up to i-2
        long best = 0; // best up to i-1
        for (int h : houses) {
            long next = Math.max(best, skipLast + h);
            skipLast = best;
            best = next;
        }
        return best;
    }

    public static long knapsackBottomUp(int[] weights, int[] values, int capacity) {
        if (weights.length != values.length) {
            throw new IllegalArgumentException("weights and values differ in length");
        }
        if (capacity < 0) {
            return 0;
        }
        long[] best = new long[capacity + 1];
        for (int i = 0; i < weights.length; i++) {
            if (weights[i] < 0) {
                throw new IllegalArgumentException("weights must not be negative");
            }
            // walk capacities downwards so each item is used at most once
            for (int c = capacity; c >= weights[i]; c--) {
                best[c] = Math.max(best[c], best[c - weights[i]] + values[i]);
            }
        }
        return best[capacity];
    }

    public static int longestCommonSubsequence(String a, String b) {
        int[][] t = new int[a.length() + 1][b.length() + 1];
        for (int i = a.length() - 1; i >= 0; i--) {
            for (int j = b.length() - 1; j >= 0; j--) {
                t[i][j] =
                        a.charAt(i) == b.charAt(j)
                                ? 1 + t[i + 1][j + 1]
                                : Math.max(t[i + 1][j], t[i][j + 1]);
            }
        }
        return t[0][0];
    }

    public static int editDistance(String a, String b) {
        int[][] t = new int[a.length() + 1][b.length() + 1];
        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0 || j == 0) {
                    t[i][j] = i + j;
                } else if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    t[i][j] = t[i - 1][j - 1];
                } else {
                    t[i][j] = 1 + Math.min(t[i - 1][j - 1], Math.min(t[i - 1][j], t[i][j - 1]));
                }
            }
        }
        return t[a.length()][b.length()];
    }

    /** Fewest coins for an amount with any coin system, or -1 if impossible. */
    public static int minCoins(int[] coins, int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("amount must not be negative");
        }
        int[] best = new int[amount + 1];
        Arrays.fill(best, Integer.MAX_VALUE);
        best[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= 0) {
                    throw new IllegalArgumentException("coins must be positive");
                }
                if (c <= a && best[a - c] != Integer.MAX_VALUE) {
                    best[a] = Math.min(best[a], best[a - c] + 1);
                }
            }
        }
        return best[amount] == Integer.MAX_VALUE ? -1 : best[amount];
    }

    /** Length of the longest strictly increasing subsequence, O(n log n). */
    public static int longestIncreasingSubsequence(int[] a) {
        int[] tails = new int[a.length];
        int length = 0;
        for (int x : a) {
            int i = Arrays.binarySearch(tails, 0, length, x);
            if (i < 0) {
                i = -i - 1;
            }
            tails[i] = x;
            if (i == length) {
                length++;
            }
        }
        return length;
    }

    private static void requireNonNegative(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("must not be negative: " + n);
        }
    }
}
