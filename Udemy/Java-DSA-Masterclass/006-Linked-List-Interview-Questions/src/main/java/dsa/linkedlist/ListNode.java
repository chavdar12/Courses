package dsa.linkedlist;

import java.util.ArrayList;
import java.util.List;

/** A bare singly linked node, the shape interview questions use. */
public final class ListNode {
    public int value;
    public ListNode next;

    public ListNode(int value) {
        this.value = value;
    }

    public static ListNode of(int... values) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (int v : values) {
            tail = tail.next = new ListNode(v);
        }
        return dummy.next;
    }

    public static List<Integer> toList(ListNode head) {
        List<Integer> out = new ArrayList<>();
        for (ListNode n = head; n != null; n = n.next) {
            out.add(n.value);
        }
        return out;
    }
}
