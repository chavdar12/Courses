package dsa.divideconquer;

/**
 * Plain recursive solutions: split the problem, solve the parts, combine. Most are exponential
 * because sub-problems repeat; the dynamic-programming section fixes that.
 */
public final class DivideAndConquer {
    private DivideAndConquer() {}

    /** Ways to write n as an ordered sum of 1, 3 and 4. */
    public static long numberFactor(int n) {
        if (n < 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }
        return numberFactor(n - 1) + numberFactor(n - 3) + numberFactor(n - 4);
    }

    /** Most money from houses in a row without robbing two neighbours. */
    public static long houseRobber(int[] houses) {
        return rob(houses, 0);
    }

    private static long rob(int[] houses, int i) {
        if (i >= houses.length) {
            return 0;
        }
        return Math.max(houses[i] + rob(houses, i + 2), rob(houses, i + 1));
    }

    /** Fewest inserts, deletes and replaces turning a into b. */
    public static int editDistance(String a, String b) {
        return edit(a, b, 0, 0);
    }

    private static int edit(String a, String b, int i, int j) {
        if (i == a.length()) {
            return b.length() - j;
        }
        if (j == b.length()) {
            return a.length() - i;
        }
        if (a.charAt(i) == b.charAt(j)) {
            return edit(a, b, i + 1, j + 1);
        }
        return 1
                + Math.min(
                        edit(a, b, i + 1, j + 1),
                        Math.min(edit(a, b, i + 1, j), edit(a, b, i, j + 1)));
    }

    /** Best value fitting in capacity, each item taken whole or not at all. */
    public static long knapsack(int[] weights, int[] values, int capacity) {
        if (weights.length != values.length) {
            throw new IllegalArgumentException("weights and values differ in length");
        }
        return knapsack(weights, values, capacity, 0);
    }

    private static long knapsack(int[] w, int[] v, int capacity, int i) {
        if (i == w.length || capacity <= 0) {
            return 0;
        }
        long skip = knapsack(w, v, capacity, i + 1);
        if (w[i] > capacity) {
            return skip;
        }
        return Math.max(skip, v[i] + knapsack(w, v, capacity - w[i], i + 1));
    }

    public static int longestCommonSubsequence(String a, String b) {
        return lcs(a, b, 0, 0);
    }

    private static int lcs(String a, String b, int i, int j) {
        if (i == a.length() || j == b.length()) {
            return 0;
        }
        if (a.charAt(i) == b.charAt(j)) {
            return 1 + lcs(a, b, i + 1, j + 1);
        }
        return Math.max(lcs(a, b, i + 1, j), lcs(a, b, i, j + 1));
    }

    public static int longestPalindromicSubsequence(String s) {
        return lps(s, 0, s.length() - 1);
    }

    private static int lps(String s, int i, int j) {
        if (i > j) {
            return 0;
        }
        if (i == j) {
            return 1;
        }
        if (s.charAt(i) == s.charAt(j)) {
            return 2 + lps(s, i + 1, j - 1);
        }
        return Math.max(lps(s, i + 1, j), lps(s, i, j - 1));
    }

    /** Cheapest path from the top-left to the bottom-right cell, moving right or down. */
    public static long minCostPath(int[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) {
            throw new IllegalArgumentException("grid must not be empty");
        }
        return minCost(grid, grid.length - 1, grid[0].length - 1);
    }

    private static long minCost(int[][] g, int r, int c) {
        if (r < 0 || c < 0) {
            return Long.MAX_VALUE;
        }
        if (r == 0 && c == 0) {
            return g[0][0];
        }
        return g[r][c] + Math.min(minCost(g, r - 1, c), minCost(g, r, c - 1));
    }

    /** Sum of an array by splitting it in halves: the divide-and-conquer pattern itself. */
    public static long sum(int[] a) {
        return sum(a, 0, a.length);
    }

    private static long sum(int[] a, int from, int to) {
        if (to - from == 0) {
            return 0;
        }
        if (to - from == 1) {
            return a[from];
        }
        int mid = (from + to) >>> 1;
        return sum(a, from, mid) + sum(a, mid, to);
    }
}
