package dsa.bigo;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ComplexityTest {
    @Test
    void sumAndProduct() {
        assertArrayEquals(new long[] {10, 24}, Complexity.sumAndProduct(new int[] {1, 2, 3, 4}));
        assertArrayEquals(new long[] {0, 1}, Complexity.sumAndProduct(new int[0]));
    }

    @Test
    void allPairsIsQuadratic() {
        assertEquals(9, Complexity.allPairs(new int[] {1, 2, 3}).size());
        assertTrue(Complexity.allPairs(new int[0]).isEmpty());
    }

    @Test
    void isPrime() {
        assertFalse(Complexity.isPrime(1));
        assertFalse(Complexity.isPrime(-7));
        assertTrue(Complexity.isPrime(2));
        assertTrue(Complexity.isPrime(97));
        assertFalse(Complexity.isPrime(91));
        assertTrue(Complexity.isPrime(2_147_483_647L));
    }

    @Test
    void halvingStepsIsLogarithmic() {
        assertEquals(0, Complexity.halvingSteps(1));
        assertEquals(10, Complexity.halvingSteps(1024));
        assertThrows(IllegalArgumentException.class, () -> Complexity.halvingSteps(0));
    }

    @Test
    void reverseInPlace() {
        int[] a = {1, 2, 3, 4, 5};
        Complexity.reverse(a);
        assertArrayEquals(new int[] {5, 4, 3, 2, 1}, a);
        int[] empty = {};
        Complexity.reverse(empty);
        assertEquals(0, empty.length);
    }
}
