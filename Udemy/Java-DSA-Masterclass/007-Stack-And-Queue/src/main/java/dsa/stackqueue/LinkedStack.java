package dsa.stackqueue;

import java.util.NoSuchElementException;

/** Stack on a singly linked list: the head is the top. */
public class LinkedStack<E> {
    private record Node<E>(E value, Node<E> next) {}

    private Node<E> top;
    private int size;

    public void push(E item) {
        top = new Node<>(item, top);
        size++;
    }

    public E pop() {
        E value = peek();
        top = top.next();
        size--;
        return value;
    }

    public E peek() {
        if (top == null) {
            throw new NoSuchElementException("stack is empty");
        }
        return top.value();
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }
}
