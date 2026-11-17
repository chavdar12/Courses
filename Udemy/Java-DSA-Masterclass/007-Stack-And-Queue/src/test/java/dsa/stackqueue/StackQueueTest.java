package dsa.stackqueue;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;

class StackQueueTest {
    @Test
    void arrayStackGrowsAndIsLifo() {
        ArrayStack<Integer> stack = new ArrayStack<>();
        for (int i = 0; i < 100; i++) {
            stack.push(i);
        }
        assertEquals(100, stack.size());
        assertEquals(99, stack.peek());
        for (int i = 99; i >= 0; i--) {
            assertEquals(i, stack.pop());
        }
        assertTrue(stack.isEmpty());
        assertThrows(NoSuchElementException.class, stack::pop);
    }

    @Test
    void linkedStackIsLifo() {
        LinkedStack<String> stack = new LinkedStack<>();
        assertThrows(NoSuchElementException.class, stack::peek);
        stack.push("a");
        stack.push("b");
        assertEquals("b", stack.pop());
        assertEquals("a", stack.peek());
        assertEquals(1, stack.size());
    }

    @Test
    void circularQueueWrapsAround() {
        CircularArrayQueue<Integer> queue = new CircularArrayQueue<>(3);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        assertTrue(queue.isFull());
        assertThrows(IllegalStateException.class, () -> queue.enqueue(4));
        assertEquals(1, queue.dequeue());
        queue.enqueue(4); // goes into the slot freed at the front
        assertEquals(2, queue.dequeue());
        assertEquals(3, queue.dequeue());
        assertEquals(4, queue.dequeue());
        assertThrows(NoSuchElementException.class, queue::dequeue);
        assertThrows(IllegalArgumentException.class, () -> new CircularArrayQueue<>(0));
    }

    @Test
    void linkedQueueIsFifo() {
        LinkedQueue<Integer> queue = new LinkedQueue<>();
        queue.enqueue(1);
        queue.enqueue(2);
        assertEquals(1, queue.dequeue());
        assertEquals(2, queue.dequeue());
        assertTrue(queue.isEmpty());
        queue.enqueue(3); // tail was reset when the queue emptied
        assertEquals(3, queue.peek());
        assertThrows(NoSuchElementException.class, () -> new LinkedQueue<>().dequeue());
    }
}
