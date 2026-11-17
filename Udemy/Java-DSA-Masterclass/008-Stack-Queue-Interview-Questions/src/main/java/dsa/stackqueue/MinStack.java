package dsa.stackqueue;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.NoSuchElementException;

/** A stack whose min() is O(1): a second stack remembers the minimum at every depth. */
public class MinStack {
    private final Deque<Integer> values = new ArrayDeque<>();
    private final Deque<Integer> mins = new ArrayDeque<>();

    public void push(int value) {
        values.push(value);
        mins.push(mins.isEmpty() ? value : Math.min(value, mins.peek()));
    }

    public int pop() {
        requireNotEmpty();
        mins.pop();
        return values.pop();
    }

    public int min() {
        requireNotEmpty();
        return mins.peek();
    }

    private void requireNotEmpty() {
        if (values.isEmpty()) {
            throw new NoSuchElementException("stack is empty");
        }
    }
}
