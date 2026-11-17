package dsa.linkedlist;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;

public class DoublyLinkedList<E> implements Iterable<E> {
    private static final class Node<E> {
        E value;
        Node<E> prev;
        Node<E> next;

        Node(E value) {
            this.value = value;
        }
    }

    private Node<E> head;
    private Node<E> tail;
    private int size;

    public void addFirst(E value) {
        Node<E> node = new Node<>(value);
        node.next = head;
        if (head == null) {
            tail = node;
        } else {
            head.prev = node;
        }
        head = node;
        size++;
    }

    public void addLast(E value) {
        Node<E> node = new Node<>(value);
        node.prev = tail;
        if (tail == null) {
            head = node;
        } else {
            tail.next = node;
        }
        tail = node;
        size++;
    }

    public E get(int index) {
        return node(index).value;
    }

    public E removeFirst() {
        if (head == null) {
            throw new NoSuchElementException("list is empty");
        }
        return unlink(head);
    }

    public E removeLast() {
        if (tail == null) {
            throw new NoSuchElementException("list is empty");
        }
        return unlink(tail);
    }

    public E remove(int index) {
        return unlink(node(index));
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    /** Walks the list from the tail, which only a doubly linked list can do cheaply. */
    public List<E> toReversedList() {
        List<E> out = new ArrayList<>(size);
        for (Node<E> n = tail; n != null; n = n.prev) {
            out.add(n.value);
        }
        return out;
    }

    @Override
    public Iterator<E> iterator() {
        return new Iterator<>() {
            private Node<E> current = head;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public E next() {
                if (current == null) {
                    throw new NoSuchElementException();
                }
                E value = current.value;
                current = current.next;
                return value;
            }
        };
    }

    private E unlink(Node<E> node) {
        if (node.prev == null) {
            head = node.next;
        } else {
            node.prev.next = node.next;
        }
        if (node.next == null) {
            tail = node.prev;
        } else {
            node.next.prev = node.prev;
        }
        size--;
        return node.value;
    }

    private Node<E> node(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException(index);
        }
        // walk from whichever end is closer
        if (index < size / 2) {
            Node<E> n = head;
            for (int i = 0; i < index; i++) {
                n = n.next;
            }
            return n;
        }
        Node<E> n = tail;
        for (int i = size - 1; i > index; i--) {
            n = n.prev;
        }
        return n;
    }
}
