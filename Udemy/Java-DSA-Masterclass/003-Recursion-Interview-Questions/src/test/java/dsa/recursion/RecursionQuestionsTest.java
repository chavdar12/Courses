package dsa.recursion;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class RecursionQuestionsTest {
    @Test
    void productOfArray() {
        assertEquals(60, RecursionQuestions.productOfArray(new int[] {1, 3, 4, 5}));
        assertEquals(1, RecursionQuestions.productOfArray(new int[0]));
    }

    @Test
    void recursiveRange() {
        assertEquals(21, RecursionQuestions.recursiveRange(6));
        assertEquals(0, RecursionQuestions.recursiveRange(0));
        assertThrows(IllegalArgumentException.class, () -> RecursionQuestions.recursiveRange(-1));
    }

    @Test
    void reverseAndPalindrome() {
        assertEquals("olleh", RecursionQuestions.reverse("hello"));
        assertEquals("", RecursionQuestions.reverse(""));
        assertTrue(RecursionQuestions.isPalindrome("racecar"));
        assertTrue(RecursionQuestions.isPalindrome(""));
        assertFalse(RecursionQuestions.isPalindrome("tacos"));
    }

    @Test
    void someRecursive() {
        assertTrue(RecursionQuestions.someRecursive(new int[] {2, 4, 5}, n -> n % 2 == 1));
        assertFalse(RecursionQuestions.someRecursive(new int[] {2, 4}, n -> n % 2 == 1));
        assertFalse(RecursionQuestions.someRecursive(new int[0], n -> true));
    }

    @Test
    void flatten() {
        List<?> nested = List.of(1, List.of(2, List.of(3, List.of())), 4);
        assertEquals(List.of(1, 2, 3, 4), RecursionQuestions.flatten(nested));
    }

    @Test
    void capitalize() {
        assertEquals(
                List.of("Car", "Taco", ""),
                RecursionQuestions.capitalizeFirst(List.of("car", "taco", "")));
        assertEquals(List.of("I", "AM"), RecursionQuestions.capitalizeWords(List.of("i", "am")));
        assertTrue(RecursionQuestions.capitalizeWords(List.of()).isEmpty());
    }

    @Test
    void nestedMaps() {
        Map<String, Object> inner = new LinkedHashMap<>();
        inner.put("a", 2);
        inner.put("b", "yes");
        inner.put("c", Map.of("d", 3, "e", "no"));
        Map<String, Object> outer = new LinkedHashMap<>();
        outer.put("x", 4);
        outer.put("y", inner);
        outer.put("z", "hi");
        assertEquals(6, RecursionQuestions.nestedEvenSum(outer));
        assertEquals(List.of("yes", "no", "hi"), RecursionQuestions.collectStrings(outer));
    }
}
