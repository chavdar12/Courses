package dsa.linkedlist;

import static dsa.linkedlist.ListNode.of;
import static dsa.linkedlist.ListNode.toList;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.List;

class LinkedListQuestionsTest {
    @Test
    void removeDuplicates() {
        assertEquals(
                List.of(1, 2, 3),
                toList(LinkedListQuestions.removeDuplicates(of(1, 2, 1, 3, 2, 2))));
        assertNull(LinkedListQuestions.removeDuplicates(null));
    }

    @Test
    void nthToLast() {
        ListNode list = of(1, 2, 3, 4, 5);
        assertEquals(4, LinkedListQuestions.nthToLast(list, 2).value);
        assertEquals(1, LinkedListQuestions.nthToLast(list, 5).value);
        assertThrows(IllegalArgumentException.class, () -> LinkedListQuestions.nthToLast(list, 6));
        assertThrows(IllegalArgumentException.class, () -> LinkedListQuestions.nthToLast(list, 0));
    }

    @Test
    void partition() {
        assertEquals(
                List.of(3, 2, 1, 5, 8, 5, 10),
                toList(LinkedListQuestions.partition(of(3, 5, 8, 5, 10, 2, 1), 5)));
        assertNull(LinkedListQuestions.partition(null, 1));
    }

    @Test
    void sumLists() {
        // 617 + 295 = 912
        assertEquals(
                List.of(2, 1, 9), toList(LinkedListQuestions.sumLists(of(7, 1, 6), of(5, 9, 2))));
        // 99 + 1 = 100: the final carry adds a digit
        assertEquals(List.of(0, 0, 1), toList(LinkedListQuestions.sumLists(of(9, 9), of(1))));
        assertNull(LinkedListQuestions.sumLists(null, null));
    }

    @Test
    void intersection() {
        ListNode shared = of(7, 8);
        ListNode a = of(1, 2, 3);
        a.next.next.next = shared;
        ListNode b = of(9);
        b.next = shared;
        assertSame(shared, LinkedListQuestions.intersection(a, b));
        assertNull(LinkedListQuestions.intersection(of(1, 2), of(1, 2)));
    }
}
