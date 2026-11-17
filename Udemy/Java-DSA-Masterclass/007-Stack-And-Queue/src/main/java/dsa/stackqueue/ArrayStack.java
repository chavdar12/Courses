package dsa.stackqueue;

import java.util.Arrays;
import java.util.NoSuchElementException;

/** Stack on a growing array: push and pop are amortized O(1). */
public class ArrayStack<E> {
    private Object[] items = new Object[8];
    private int size;

    public void push(E item) {
        if (size == items.length) {
            items = Arrays.copyOf(items, size * 2);
        }
        items[size++] = item;
    }

    public E pop() {
        E top = peek();
        items[--size] = null; // let the GC reclaim it
        return top;
    }

    @SuppressWarnings("unchecked")
    public E peek() {
        if (size == 0) {
            throw new NoSuchElementException("stack is empty");
        }
        return (E) items[size - 1];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}
