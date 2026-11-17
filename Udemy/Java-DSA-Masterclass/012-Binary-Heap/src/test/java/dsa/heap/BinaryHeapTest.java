package dsa.heap;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.PriorityQueue;
import java.util.Random;

class BinaryHeapTest {
    @Test
    void minHeapPollsInAscendingOrder() {
        BinaryHeap<Integer> heap = BinaryHeap.minHeap();
        for (int v : new int[] {5, 3, 8, 1, 3, 9, 2}) {
            heap.add(v);
        }
        List<Integer> out = new ArrayList<>();
        while (!heap.isEmpty()) {
            out.add(heap.poll());
        }
        assertEquals(List.of(1, 2, 3, 3, 5, 8, 9), out);
    }

    @Test
    void maxHeapKeepsLargestOnTop() {
        BinaryHeap<Integer> heap = BinaryHeap.maxHeap();
        heap.add(1);
        heap.add(10);
        heap.add(5);
        assertEquals(10, heap.peek());
        assertEquals(10, heap.poll());
        assertEquals(5, heap.poll());
        assertEquals(1, heap.size());
    }

    @Test
    void matchesJavaPriorityQueue() {
        Random random = new Random(7);
        BinaryHeap<Integer> heap = BinaryHeap.minHeap();
        PriorityQueue<Integer> expected = new PriorityQueue<>();
        for (int i = 0; i < 1000; i++) {
            if (expected.isEmpty() || random.nextInt(3) > 0) {
                int v = random.nextInt(100) - 50;
                heap.add(v);
                expected.add(v);
            } else {
                assertEquals(expected.poll(), heap.poll());
            }
        }
        assertEquals(expected.size(), heap.size());
    }

    @Test
    void emptyHeapThrows() {
        BinaryHeap<String> heap = BinaryHeap.minHeap();
        assertThrows(NoSuchElementException.class, heap::peek);
        assertThrows(NoSuchElementException.class, heap::poll);
        heap.add("only");
        assertEquals("only", heap.poll());
        assertTrue(heap.isEmpty());
    }
}
