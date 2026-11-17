package dsa.heap;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Array-backed binary heap. The comparator picks min-heap or max-heap: the element that compares
 * smallest is always at the top.
 */
public class BinaryHeap<E> {
    private final List<E> items = new ArrayList<>();
    private final Comparator<? super E> order;

    public BinaryHeap(Comparator<? super E> order) {
        this.order = order;
    }

    public static <E extends Comparable<? super E>> BinaryHeap<E> minHeap() {
        return new BinaryHeap<>(Comparator.naturalOrder());
    }

    public static <E extends Comparable<? super E>> BinaryHeap<E> maxHeap() {
        return new BinaryHeap<>(Comparator.reverseOrder());
    }

    public void add(E item) {
        items.add(item);
        int i = items.size() - 1;
        while (i > 0 && less(i, (i - 1) / 2)) {
            swap(i, (i - 1) / 2);
            i = (i - 1) / 2;
        }
    }

    public E peek() {
        if (items.isEmpty()) {
            throw new NoSuchElementException("heap is empty");
        }
        return items.getFirst();
    }

    public E poll() {
        E top = peek();
        E last = items.removeLast();
        if (!items.isEmpty()) {
            items.set(0, last);
            siftDown(0);
        }
        return top;
    }

    public int size() {
        return items.size();
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    private void siftDown(int i) {
        while (true) {
            int smallest = i;
            for (int child = 2 * i + 1; child <= 2 * i + 2 && child < items.size(); child++) {
                if (less(child, smallest)) {
                    smallest = child;
                }
            }
            if (smallest == i) {
                return;
            }
            swap(i, smallest);
            i = smallest;
        }
    }

    private boolean less(int a, int b) {
        return order.compare(items.get(a), items.get(b)) < 0;
    }

    private void swap(int a, int b) {
        items.set(a, items.set(b, items.get(a)));
    }
}
