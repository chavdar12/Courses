package dsa.linkedlist;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/** Singly linked list whose tail points back to the head. */
public class CircularLinkedList<E> {
    private static final class Node<E> {
        final E value;
        Node<E> next;

        Node(E value) {
            this.value = value;
        }
    }

    private Node<E> tail;
    private int size;

    public void add(E value) {
        Node<E> node = new Node<>(value);
        if (tail == null) {
            node.next = node;
        } else {
            node.next = tail.next;
            tail.next = node;
        }
        tail = node;
        size++;
    }

    public E removeFirst() {
        if (tail == null) {
            throw new NoSuchElementException("list is empty");
        }
        Node<E> head = tail.next;
        if (head == tail) {
            tail = null;
        } else {
            tail.next = head.next;
        }
        size--;
        return head.value;
    }

    /** Moves the head forward {@code steps} times; O(steps mod size). */
    public void rotate(int steps) {
        if (size == 0) {
            return;
        }
        for (int i = 0; i < Math.floorMod(steps, size); i++) {
            tail = tail.next;
        }
    }

    public boolean isCircular() {
        return tail == null || tail.next != null;
    }

    public int size() {
        return size;
    }

    public List<E> toList() {
        List<E> out = new ArrayList<>(size);
        if (tail == null) {
            return out;
        }
        Node<E> n = tail.next;
        do {
            out.add(n.value);
            n = n.next;
        } while (n != tail.next);
        return out;
    }
}
