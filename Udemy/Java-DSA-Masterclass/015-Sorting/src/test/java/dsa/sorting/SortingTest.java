package dsa.sorting;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.Arrays;
import java.util.Random;
import java.util.function.Consumer;
import java.util.stream.Stream;

class SortingTest {
    static Stream<Arguments> sorts() {
        return Stream.of(
                Arguments.of("bubble", (Consumer<int[]>) Sorting::bubbleSort),
                Arguments.of("selection", (Consumer<int[]>) Sorting::selectionSort),
                Arguments.of("insertion", (Consumer<int[]>) Sorting::insertionSort),
                Arguments.of("bucket", (Consumer<int[]>) Sorting::bucketSort),
                Arguments.of("merge", (Consumer<int[]>) Sorting::mergeSort),
                Arguments.of("quick", (Consumer<int[]>) Sorting::quickSort),
                Arguments.of("heap", (Consumer<int[]>) Sorting::heapSort));
    }

    private static void assertSorts(Consumer<int[]> sort, int[] input) {
        int[] expected = input.clone();
        Arrays.sort(expected);
        sort.accept(input);
        assertArrayEquals(expected, input);
    }

    @ParameterizedTest(name = "{0}")
    @MethodSource("sorts")
    void edgeCases(String name, Consumer<int[]> sort) {
        assertSorts(sort, new int[0]);
        assertSorts(sort, new int[] {42});
        assertSorts(sort, new int[] {2, 1});
        assertSorts(sort, new int[] {5, 5, 5, 5});
        assertSorts(sort, new int[] {1, 2, 3, 4, 5});
        assertSorts(sort, new int[] {5, 4, 3, 2, 1});
        assertSorts(sort, new int[] {3, -1, 0, -7, 3, 2});
        assertSorts(sort, new int[] {Integer.MAX_VALUE, Integer.MIN_VALUE, 0});
    }

    @ParameterizedTest(name = "{0}")
    @MethodSource("sorts")
    void randomArrays(String name, Consumer<int[]> sort) {
        Random random = new Random(name.hashCode());
        for (int round = 0; round < 50; round++) {
            assertSorts(sort, random.ints(random.nextInt(200), -1000, 1000).toArray());
        }
    }
}
