package dsa.divideconquer;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class DivideAndConquerTest {
    @Test
    void numberFactor() {
        assertEquals(1, DivideAndConquer.numberFactor(0));
        assertEquals(4, DivideAndConquer.numberFactor(4)); // 1111, 13, 31, 4
        assertEquals(6, DivideAndConquer.numberFactor(5));
        assertEquals(0, DivideAndConquer.numberFactor(-1));
    }

    @Test
    void houseRobber() {
        assertEquals(41, DivideAndConquer.houseRobber(new int[] {6, 7, 1, 30, 8, 2, 4}));
        assertEquals(0, DivideAndConquer.houseRobber(new int[0]));
        assertEquals(5, DivideAndConquer.houseRobber(new int[] {5}));
    }

    @Test
    void editDistance() {
        assertEquals(3, DivideAndConquer.editDistance("kitten", "sitting"));
        assertEquals(4, DivideAndConquer.editDistance("", "abcd"));
        assertEquals(0, DivideAndConquer.editDistance("same", "same"));
    }

    @Test
    void knapsack() {
        assertEquals(
                220,
                DivideAndConquer.knapsack(new int[] {10, 20, 30}, new int[] {60, 100, 120}, 50));
        assertEquals(0, DivideAndConquer.knapsack(new int[] {10}, new int[] {60}, 5));
        assertThrows(
                IllegalArgumentException.class,
                () -> DivideAndConquer.knapsack(new int[] {1}, new int[0], 5));
    }

    @Test
    void subsequences() {
        assertEquals(4, DivideAndConquer.longestCommonSubsequence("ABCBDAB", "BDCABA"));
        assertEquals(0, DivideAndConquer.longestCommonSubsequence("", "abc"));
        assertEquals(5, DivideAndConquer.longestPalindromicSubsequence("ELRMENMET")); // EMEME
        assertEquals(0, DivideAndConquer.longestPalindromicSubsequence(""));
    }

    @Test
    void minCostPath() {
        int[][] grid = {
            {4, 7, 8, 6, 4}, {6, 7, 3, 9, 2}, {3, 8, 1, 2, 4}, {7, 1, 7, 3, 7}, {2, 9, 8, 9, 3}
        };
        assertEquals(36, DivideAndConquer.minCostPath(grid));
        assertEquals(5, DivideAndConquer.minCostPath(new int[][] {{5}}));
        assertThrows(
                IllegalArgumentException.class, () -> DivideAndConquer.minCostPath(new int[0][0]));
    }

    @Test
    void sumByHalves() {
        assertEquals(15, DivideAndConquer.sum(new int[] {1, 2, 3, 4, 5}));
        assertEquals(0, DivideAndConquer.sum(new int[0]));
        assertEquals(
                2L * Integer.MAX_VALUE,
                DivideAndConquer.sum(new int[] {Integer.MAX_VALUE, Integer.MAX_VALUE}));
    }
}
