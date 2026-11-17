package dsa.stackqueue;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.NoSuchElementException;

/** FIFO queue from two LIFO stacks; each element moves between them at most once. */
public class QueueViaStacks<E> {
    private final Deque<E> in = new ArrayDeque<>();
    private final Deque<E> out = new ArrayDeque<>();

    public void enqueue(E item) {
        in.push(item);
    }

    public E dequeue() {
        shift();
        return out.pop();
    }

    public E peek() {
        shift();
        return out.peek();
    }

    public int size() {
        return in.size() + out.size();
    }

    private void shift() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) {
                out.push(in.pop());
            }
        }
        if (out.isEmpty()) {
            throw new NoSuchElementException("queue is empty");
        }
    }
}
