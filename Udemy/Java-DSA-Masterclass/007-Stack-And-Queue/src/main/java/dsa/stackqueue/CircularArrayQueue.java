package dsa.stackqueue;

import java.util.NoSuchElementException;

/** Fixed-capacity queue on an array whose front and back wrap around. */
public class CircularArrayQueue<E> {
    private final Object[] items;
    private int front;
    private int size;

    public CircularArrayQueue(int capacity) {
        if (capacity < 1) {
            throw new IllegalArgumentException("capacity must be positive");
        }
        items = new Object[capacity];
    }

    public void enqueue(E item) {
        if (isFull()) {
            throw new IllegalStateException("queue is full");
        }
        items[(front + size) % items.length] = item;
        size++;
    }

    public E dequeue() {
        E item = peek();
        items[front] = null;
        front = (front + 1) % items.length;
        size--;
        return item;
    }

    @SuppressWarnings("unchecked")
    public E peek() {
        if (size == 0) {
            throw new NoSuchElementException("queue is empty");
        }
        return (E) items[front];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == items.length;
    }

    public int size() {
        return size;
    }
}
