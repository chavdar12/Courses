package dsa.linkedlist;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class SinglyLinkedList<E> implements Iterable<E> {
    private static final class Node<E> {
        E value;
        Node<E> next;

        Node(E value, Node<E> next) {
            this.value = value;
            this.next = next;
        }
    }

    private Node<E> head;
    private Node<E> tail;
    private int size;

    public void addFirst(E value) {
        head = new Node<>(value, head);
        if (tail == null) {
            tail = head;
        }
        size++;
    }

    public void addLast(E value) {
        Node<E> node = new Node<>(value, null);
        if (tail == null) {
            head = node;
        } else {
            tail.next = node;
        }
        tail = node;
        size++;
    }

    public void insert(int index, E value) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException(index);
        }
        if (index == 0) {
            addFirst(value);
        } else if (index == size) {
            addLast(value);
        } else {
            Node<E> prev = node(index - 1);
            prev.next = new Node<>(value, prev.next);
            size++;
        }
    }

    public E get(int index) {
        checkIndex(index);
        return node(index).value;
    }

    public E removeFirst() {
        if (head == null) {
            throw new NoSuchElementException("list is empty");
        }
        E value = head.value;
        head = head.next;
        if (head == null) {
            tail = null;
        }
        size--;
        return value;
    }

    public E removeLast() {
        return remove(size - 1);
    }

    public E remove(int index) {
        if (size == 0) {
            throw new NoSuchElementException("list is empty");
        }
        checkIndex(index);
        if (index == 0) {
            return removeFirst();
        }
        Node<E> prev = node(index - 1);
        E value = prev.next.value;
        prev.next = prev.next.next;
        if (prev.next == null) {
            tail = prev;
        }
        size--;
        return value;
    }

    public int indexOf(E value) {
        int i = 0;
        for (E e : this) {
            if (java.util.Objects.equals(e, value)) {
                return i;
            }
            i++;
        }
        return -1;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void clear() {
        head = tail = null;
        size = 0;
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

    private Node<E> node(int index) {
        Node<E> n = head;
        for (int i = 0; i < index; i++) {
            n = n.next;
        }
        return n;
    }

    private void checkIndex(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException(index);
        }
    }
}
