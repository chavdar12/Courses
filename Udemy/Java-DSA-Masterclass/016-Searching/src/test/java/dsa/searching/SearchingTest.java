package dsa.searching;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class SearchingTest {
    private final int[] sorted = {-5, 1, 3, 3, 3, 8, 13};

    @Test
    void linearSearchReturnsFirstMatch() {
        assertEquals(2, Searching.linearSearch(sorted, 3));
        assertEquals(-1, Searching.linearSearch(sorted, 4));
        assertEquals(-1, Searching.linearSearch(new int[0], 1));
    }

    @Test
    void binarySearchFindsEveryElement() {
        for (int i = 0; i < sorted.length; i++) {
            assertEquals(sorted[i], sorted[Searching.binarySearch(sorted, sorted[i])]);
        }
        assertEquals(-1, Searching.binarySearch(sorted, 4));
        assertEquals(-1, Searching.binarySearch(sorted, -100));
        assertEquals(-1, Searching.binarySearch(sorted, 100));
        assertEquals(-1, Searching.binarySearch(new int[0], 1));
        assertEquals(0, Searching.binarySearch(new int[] {7}, 7));
    }

    @Test
    void lowerBoundFindsFirstOfDuplicates() {
        assertEquals(2, Searching.lowerBound(sorted, 3));
        assertEquals(5, Searching.lowerBound(sorted, 4));
        assertEquals(0, Searching.lowerBound(sorted, -100));
        assertEquals(sorted.length, Searching.lowerBound(sorted, 100));
    }
}
