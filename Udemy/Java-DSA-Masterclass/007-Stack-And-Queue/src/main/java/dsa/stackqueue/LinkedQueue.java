package dsa.stackqueue;

import java.util.NoSuchElementException;

/** Unbounded queue on a singly linked list with head and tail pointers. */
public class LinkedQueue<E> {
    private static final class Node<E> {
        final E value;
        Node<E> next;

        Node(E value) {
            this.value = value;
        }
    }

    private Node<E> head;
    private Node<E> tail;
    private int size;

    public void enqueue(E item) {
        Node<E> node = new Node<>(item);
        if (tail == null) {
            head = node;
        } else {
            tail.next = node;
        }
        tail = node;
        size++;
    }

    public E dequeue() {
        E value = peek();
        head = head.next;
        if (head == null) {
            tail = null;
        }
        size--;
        return value;
    }

    public E peek() {
        if (head == null) {
            throw new NoSuchElementException("queue is empty");
        }
        return head.value;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}
