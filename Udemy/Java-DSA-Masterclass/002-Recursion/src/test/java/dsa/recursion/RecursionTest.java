package dsa.recursion;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class RecursionTest {
    @Test
    void factorial() {
        assertEquals(1, Recursion.factorial(0));
        assertEquals(120, Recursion.factorial(5));
        assertEquals(2_432_902_008_176_640_000L, Recursion.factorial(20));
        assertThrows(IllegalArgumentException.class, () -> Recursion.factorial(21));
        assertThrows(IllegalArgumentException.class, () -> Recursion.factorial(-1));
    }

    @Test
    void fibonacci() {
        assertEquals(0, Recursion.fibonacci(0));
        assertEquals(1, Recursion.fibonacci(1));
        assertEquals(55, Recursion.fibonacci(10));
        assertThrows(IllegalArgumentException.class, () -> Recursion.fibonacci(-3));
    }

    @Test
    void sumOfDigits() {
        assertEquals(0, Recursion.sumOfDigits(0));
        assertEquals(10, Recursion.sumOfDigits(1234));
    }

    @Test
    void power() {
        assertEquals(1, Recursion.power(7, 0));
        assertEquals(1024, Recursion.power(2, 10));
        assertEquals(-27, Recursion.power(-3, 3));
        assertThrows(IllegalArgumentException.class, () -> Recursion.power(2, -1));
    }

    @Test
    void gcd() {
        assertEquals(6, Recursion.gcd(48, 18));
        assertEquals(6, Recursion.gcd(-48, 18));
        assertEquals(5, Recursion.gcd(0, 5));
    }

    @Test
    void toBinary() {
        assertEquals("0", Recursion.toBinary(0));
        assertEquals("1010", Recursion.toBinary(10));
        assertEquals(
                Integer.toBinaryString(Integer.MAX_VALUE), Recursion.toBinary(Integer.MAX_VALUE));
    }
}
