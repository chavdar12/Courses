package dsa.linkedlist;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

class LinkedListsTest {
    private static <E> List<E> toList(Iterable<E> items) {
        List<E> out = new ArrayList<>();
        items.forEach(out::add);
        return out;
    }

    @Test
    void singlyAddInsertRemove() {
        SinglyLinkedList<Integer> list = new SinglyLinkedList<>();
        list.addLast(2);
        list.addFirst(1);
        list.addLast(4);
        list.insert(2, 3);
        assertEquals(List.of(1, 2, 3, 4), toList(list));
        assertEquals(3, list.get(2));
        assertEquals(2, list.indexOf(3));
        assertEquals(-1, list.indexOf(9));
        assertEquals(4, list.removeLast());
        assertEquals(2, list.remove(1));
        assertEquals(1, list.removeFirst());
        assertEquals(List.of(3), toList(list));
        list.addLast(5); // tail must still be right after removals
        assertEquals(List.of(3, 5), toList(list));
    }

    @Test
    void singlyEdgeCases() {
        SinglyLinkedList<String> list = new SinglyLinkedList<>();
        assertTrue(list.isEmpty());
        assertThrows(NoSuchElementException.class, list::removeFirst);
        assertThrows(NoSuchElementException.class, list::removeLast);
        assertThrows(IndexOutOfBoundsException.class, () -> list.insert(1, "x"));
        list.addLast(null);
        assertEquals(0, list.indexOf(null));
        list.clear();
        assertEquals(0, list.size());
    }

    @Test
    void doublyBothDirections() {
        DoublyLinkedList<Integer> list = new DoublyLinkedList<>();
        for (int i = 1; i <= 5; i++) {
            list.addLast(i);
        }
        list.addFirst(0);
        assertEquals(List.of(0, 1, 2, 3, 4, 5), toList(list));
        assertEquals(List.of(5, 4, 3, 2, 1, 0), list.toReversedList());
        assertEquals(4, list.get(4));
        assertEquals(3, list.remove(3));
        assertEquals(5, list.removeLast());
        assertEquals(0, list.removeFirst());
        assertEquals(List.of(4, 2, 1), list.toReversedList());
        assertThrows(IndexOutOfBoundsException.class, () -> list.get(3));
    }

    @Test
    void doublyEmptiesCleanly() {
        DoublyLinkedList<String> list = new DoublyLinkedList<>();
        list.addLast("a");
        assertEquals("a", list.removeLast());
        assertTrue(list.isEmpty());
        assertTrue(list.toReversedList().isEmpty());
        assertThrows(NoSuchElementException.class, list::removeFirst);
    }

    @Test
    void circularWrapsAround() {
        CircularLinkedList<Integer> list = new CircularLinkedList<>();
        assertTrue(list.toList().isEmpty());
        list.rotate(3);
        for (int i = 1; i <= 4; i++) {
            list.add(i);
        }
        assertTrue(list.isCircular());
        list.rotate(1);
        assertEquals(List.of(2, 3, 4, 1), list.toList());
        list.rotate(-1);
        assertEquals(List.of(1, 2, 3, 4), list.toList());
        assertEquals(1, list.removeFirst());
        assertEquals(List.of(2, 3, 4), list.toList());
        list.removeFirst();
        list.removeFirst();
        assertEquals(4, list.removeFirst());
        assertThrows(NoSuchElementException.class, list::removeFirst);
    }
}
