package dsa.arrays;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ArrayQuestionsTest {
    @Test
    void missingNumber() {
        assertEquals(4, ArrayQuestions.missingNumber(new int[] {1, 2, 3, 5, 6}, 6));
        assertEquals(1, ArrayQuestions.missingNumber(new int[0], 1));
        assertThrows(
                IllegalArgumentException.class,
                () -> ArrayQuestions.missingNumber(new int[] {1}, 5));
    }

    @Test
    void twoSum() {
        assertArrayEquals(new int[] {0, 1}, ArrayQuestions.twoSum(new int[] {2, 7, 11, 15}, 9));
        assertArrayEquals(new int[] {0, 1}, ArrayQuestions.twoSum(new int[] {3, 3}, 6));
        assertEquals(0, ArrayQuestions.twoSum(new int[] {1, 2}, 10).length);
    }

    @Test
    void maxProductCountsNegatives() {
        assertEquals(20, ArrayQuestions.maxProduct(new int[] {1, 4, 5, 2}));
        assertEquals(50, ArrayQuestions.maxProduct(new int[] {-10, -5, 1, 3}));
        assertEquals(
                4_611_686_014_132_420_609L,
                ArrayQuestions.maxProduct(new int[] {Integer.MAX_VALUE, Integer.MAX_VALUE}));
        assertThrows(
                IllegalArgumentException.class, () -> ArrayQuestions.maxProduct(new int[] {1}));
    }

    @Test
    void uniqueAndPermutation() {
        assertTrue(ArrayQuestions.isUnique(new int[] {1, 2, 3}));
        assertFalse(ArrayQuestions.isUnique(new int[] {1, 2, 1}));
        assertTrue(ArrayQuestions.isPermutation(new int[] {1, 2, 2}, new int[] {2, 1, 2}));
        assertFalse(ArrayQuestions.isPermutation(new int[] {1, 2, 2}, new int[] {1, 1, 2}));
        assertFalse(ArrayQuestions.isPermutation(new int[] {1}, new int[0]));
    }

    @Test
    void rotateMatrix() {
        int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        ArrayQuestions.rotateMatrix(m);
        assertArrayEquals(new int[][] {{7, 4, 1}, {8, 5, 2}, {9, 6, 3}}, m);
        int[][] four = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        ArrayQuestions.rotateMatrix(four);
        assertArrayEquals(new int[] {13, 9, 5, 1}, four[0]);
        assertArrayEquals(new int[] {16, 12, 8, 4}, four[3]);
        assertThrows(
                IllegalArgumentException.class,
                () -> ArrayQuestions.rotateMatrix(new int[][] {{1, 2}}));
    }

    @Test
    void middleAndDiagonal() {
        assertArrayEquals(new int[] {2, 3}, ArrayQuestions.middle(new int[] {1, 2, 3, 4}));
        assertEquals(0, ArrayQuestions.middle(new int[] {1}).length);
        assertEquals(15, ArrayQuestions.diagonalSum(new int[][] {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}));
    }

    @Test
    void bestTwoSkipsDuplicates() {
        assertArrayEquals(
                new int[] {90, 85}, ArrayQuestions.bestTwo(new int[] {84, 85, 90, 90, 84}));
        assertThrows(
                IllegalArgumentException.class, () -> ArrayQuestions.bestTwo(new int[] {5, 5}));
    }

    @Test
    void removeDuplicatesKeepsOrder() {
        assertArrayEquals(
                new int[] {3, 1, 2}, ArrayQuestions.removeDuplicates(new int[] {3, 1, 3, 2, 1}));
    }

    @Test
    void maxProfit() {
        assertEquals(5, ArrayQuestions.maxProfit(new int[] {7, 1, 5, 3, 6, 4}));
        assertEquals(0, ArrayQuestions.maxProfit(new int[] {7, 6, 4, 3, 1}));
        assertEquals(0, ArrayQuestions.maxProfit(new int[0]));
    }
}
