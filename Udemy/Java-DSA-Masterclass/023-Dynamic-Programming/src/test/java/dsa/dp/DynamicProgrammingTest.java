package dsa.dp;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.time.Duration;

class DynamicProgrammingTest {
    @Test
    void fibonacciBothWaysAndFast() {
        for (int n = 0; n < 30; n++) {
            assertEquals(
                    DynamicProgramming.fibonacciBottomUp(n),
                    DynamicProgramming.fibonacciTopDown(n));
        }
        // the plain recursion would take years for n = 90
        assertTimeoutPreemptively(
                Duration.ofSeconds(1),
                () ->
                        assertEquals(
                                2_880_067_194_370_816_120L,
                                DynamicProgramming.fibonacciTopDown(90)));
        assertEquals(2_880_067_194_370_816_120L, DynamicProgramming.fibonacciBottomUp(90));
        assertThrows(IllegalArgumentException.class, () -> DynamicProgramming.fibonacciTopDown(-1));
    }

    @Test
    void numberFactor() {
        long[] expected = {1, 1, 1, 2, 4, 6, 9, 15};
        for (int n = 0; n < expected.length; n++) {
            assertEquals(expected[n], DynamicProgramming.numberFactorTopDown(n));
            assertEquals(expected[n], DynamicProgramming.numberFactorBottomUp(n));
        }
        assertEquals(
                DynamicProgramming.numberFactorBottomUp(80),
                DynamicProgramming.numberFactorTopDown(80));
    }

    @Test
    void houseRobber() {
        assertEquals(41, DynamicProgramming.houseRobberBottomUp(new int[] {6, 7, 1, 30, 8, 2, 4}));
        assertEquals(0, DynamicProgramming.houseRobberBottomUp(new int[0]));
        assertEquals(12, DynamicProgramming.houseRobberBottomUp(new int[] {2, 7, 9, 3, 1}));
    }

    @Test
    void knapsackUsesEachItemOnce() {
        assertEquals(
                220,
                DynamicProgramming.knapsackBottomUp(
                        new int[] {10, 20, 30}, new int[] {60, 100, 120}, 50));
        assertEquals(
                10,
                DynamicProgramming.knapsackBottomUp(new int[] {1}, new int[] {10}, 5)); // not 50
        assertEquals(0, DynamicProgramming.knapsackBottomUp(new int[0], new int[0], 10));
    }

    @Test
    void stringProblems() {
        assertEquals(4, DynamicProgramming.longestCommonSubsequence("ABCBDAB", "BDCABA"));
        assertEquals(3, DynamicProgramming.editDistance("kitten", "sitting"));
        assertEquals(4, DynamicProgramming.editDistance("abcd", ""));
        // long inputs that the exponential recursion could never finish
        String a = "ab".repeat(500);
        String b = "ba".repeat(500);
        assertEquals(999, DynamicProgramming.longestCommonSubsequence(a, b));
        assertEquals(2, DynamicProgramming.editDistance(a, b));
    }

    @Test
    void minCoinsBeatsGreedy() {
        assertEquals(2, DynamicProgramming.minCoins(new int[] {1, 3, 4}, 6)); // 3 + 3
        assertEquals(-1, DynamicProgramming.minCoins(new int[] {2}, 3));
        assertEquals(0, DynamicProgramming.minCoins(new int[] {1}, 0));
        assertThrows(
                IllegalArgumentException.class,
                () -> DynamicProgramming.minCoins(new int[] {0}, 3));
    }

    @Test
    void longestIncreasingSubsequence() {
        assertEquals(
                4,
                DynamicProgramming.longestIncreasingSubsequence(
                        new int[] {10, 9, 2, 5, 3, 7, 101, 18}));
        assertEquals(1, DynamicProgramming.longestIncreasingSubsequence(new int[] {7, 7, 7}));
        assertEquals(0, DynamicProgramming.longestIncreasingSubsequence(new int[0]));
    }
}
