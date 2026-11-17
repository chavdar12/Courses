package dsa.stackqueue;

import java.util.NoSuchElementException;

/** Three fixed-size stacks sharing one array. */
public class ThreeInOne {
    private final int capacity;
    private final int[] values;
    private final int[] sizes = new int[3];

    public ThreeInOne(int capacityPerStack) {
        if (capacityPerStack < 1) {
            throw new IllegalArgumentException("capacity must be positive");
        }
        capacity = capacityPerStack;
        values = new int[capacityPerStack * 3];
    }

    public void push(int stack, int value) {
        check(stack);
        if (sizes[stack] == capacity) {
            throw new IllegalStateException("stack " + stack + " is full");
        }
        values[stack * capacity + sizes[stack]++] = value;
    }

    public int pop(int stack) {
        int value = peek(stack);
        sizes[stack]--;
        return value;
    }

    public int peek(int stack) {
        check(stack);
        if (sizes[stack] == 0) {
            throw new NoSuchElementException("stack " + stack + " is empty");
        }
        return values[stack * capacity + sizes[stack] - 1];
    }

    public boolean isEmpty(int stack) {
        check(stack);
        return sizes[stack] == 0;
    }

    private static void check(int stack) {
        if (stack < 0 || stack > 2) {
            throw new IllegalArgumentException("stack must be 0, 1 or 2");
        }
    }
}
