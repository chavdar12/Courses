package dsa.recursion;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.IntPredicate;

/** The recursion interview questions, each solved without loops. */
public final class RecursionQuestions {
    private RecursionQuestions() {}

    public static long productOfArray(int[] numbers) {
        return product(numbers, 0);
    }

    private static long product(int[] numbers, int from) {
        return from == numbers.length ? 1 : numbers[from] * product(numbers, from + 1);
    }

    /** Sum of 0..n. */
    public static long recursiveRange(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must not be negative");
        }
        return n == 0 ? 0 : n + recursiveRange(n - 1);
    }

    public static String reverse(String s) {
        return s.isEmpty() ? s : reverse(s.substring(1)) + s.charAt(0);
    }

    public static boolean isPalindrome(String s) {
        if (s.length() < 2) {
            return true;
        }
        return s.charAt(0) == s.charAt(s.length() - 1)
                && isPalindrome(s.substring(1, s.length() - 1));
    }

    /** True if any element passes the test. */
    public static boolean someRecursive(int[] numbers, IntPredicate test) {
        return some(numbers, 0, test);
    }

    private static boolean some(int[] numbers, int from, IntPredicate test) {
        return from < numbers.length && (test.test(numbers[from]) || some(numbers, from + 1, test));
    }

    /** Flattens nested lists into one list, keeping order. */
    public static List<Object> flatten(List<?> nested) {
        List<Object> out = new ArrayList<>();
        for (Object item : nested) {
            if (item instanceof List<?> inner) {
                out.addAll(flatten(inner));
            } else {
                out.add(item);
            }
        }
        return out;
    }

    public static List<String> capitalizeFirst(List<String> words) {
        if (words.isEmpty()) {
            return new ArrayList<>();
        }
        String w = words.getFirst();
        List<String> out = new ArrayList<>();
        out.add(w.isEmpty() ? w : Character.toUpperCase(w.charAt(0)) + w.substring(1));
        out.addAll(capitalizeFirst(words.subList(1, words.size())));
        return out;
    }

    public static List<String> capitalizeWords(List<String> words) {
        if (words.isEmpty()) {
            return new ArrayList<>();
        }
        List<String> out = new ArrayList<>();
        out.add(words.getFirst().toUpperCase());
        out.addAll(capitalizeWords(words.subList(1, words.size())));
        return out;
    }

    /** Sum of every even integer anywhere in a nested map. */
    public static long nestedEvenSum(Map<String, ?> map) {
        long sum = 0;
        for (Object value : map.values()) {
            if (value instanceof Map<?, ?> inner) {
                @SuppressWarnings("unchecked")
                Map<String, ?> typed = (Map<String, ?>) inner;
                sum += nestedEvenSum(typed);
            } else if (value instanceof Integer i && i % 2 == 0) {
                sum += i;
            }
        }
        return sum;
    }

    /** Every string value anywhere in a nested map. */
    public static List<String> collectStrings(Map<String, ?> map) {
        List<String> out = new ArrayList<>();
        for (Object value : map.values()) {
            if (value instanceof Map<?, ?> inner) {
                @SuppressWarnings("unchecked")
                Map<String, ?> typed = (Map<String, ?>) inner;
                out.addAll(collectStrings(typed));
            } else if (value instanceof String s) {
                out.add(s);
            }
        }
        return out;
    }
}
