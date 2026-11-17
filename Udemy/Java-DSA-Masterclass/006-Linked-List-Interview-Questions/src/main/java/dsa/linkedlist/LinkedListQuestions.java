package dsa.linkedlist;

import java.util.HashSet;
import java.util.Set;

public final class LinkedListQuestions {
    private LinkedListQuestions() {}

    /** Removes repeated values in place, keeping the first of each. */
    public static ListNode removeDuplicates(ListNode head) {
        Set<Integer> seen = new HashSet<>();
        ListNode prev = null;
        for (ListNode n = head; n != null; n = n.next) {
            if (seen.add(n.value)) {
                prev = n;
            } else {
                prev.next = n.next;
            }
        }
        return head;
    }

    /** The n-th node from the end (1 = last), using two pointers. */
    public static ListNode nthToLast(ListNode head, int n) {
        if (n < 1) {
            throw new IllegalArgumentException("n must be at least 1");
        }
        ListNode lead = head;
        for (int i = 0; i < n; i++) {
            if (lead == null) {
                throw new IllegalArgumentException("list is shorter than " + n);
            }
            lead = lead.next;
        }
        ListNode trail = head;
        while (lead != null) {
            lead = lead.next;
            trail = trail.next;
        }
        return trail;
    }

    /** Nodes below x first, then the rest; each side keeps its order. */
    public static ListNode partition(ListNode head, int x) {
        ListNode lowDummy = new ListNode(0);
        ListNode highDummy = new ListNode(0);
        ListNode low = lowDummy;
        ListNode high = highDummy;
        for (ListNode n = head; n != null; n = n.next) {
            if (n.value < x) {
                low = low.next = n;
            } else {
                high = high.next = n;
            }
        }
        high.next = null;
        low.next = highDummy.next;
        return lowDummy.next;
    }

    /** Adds two numbers stored as digits in reverse order (617 is 7 -> 1 -> 6). */
    public static ListNode sumLists(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        int carry = 0;
        while (a != null || b != null || carry != 0) {
            int sum = carry;
            if (a != null) {
                sum += a.value;
                a = a.next;
            }
            if (b != null) {
                sum += b.value;
                b = b.next;
            }
            tail = tail.next = new ListNode(sum % 10);
            carry = sum / 10;
        }
        return dummy.next;
    }

    /** The first node shared by both lists (by reference), or null. */
    public static ListNode intersection(ListNode a, ListNode b) {
        ListNode p = a;
        ListNode q = b;
        // each pointer walks both lists, so they line up after at most two passes
        while (p != q) {
            p = p == null ? b : p.next;
            q = q == null ? a : q.next;
        }
        return p;
    }
}
