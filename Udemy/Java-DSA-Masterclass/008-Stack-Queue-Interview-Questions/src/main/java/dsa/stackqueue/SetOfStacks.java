package dsa.stackqueue;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.NoSuchElementException;

/** "Stack of plates": starts a new stack when the current one reaches the threshold. */
public class SetOfStacks {
    private final int threshold;
    private final List<Deque<Integer>> stacks = new ArrayList<>();

    public SetOfStacks(int threshold) {
        if (threshold < 1) {
            throw new IllegalArgumentException("threshold must be positive");
        }
        this.threshold = threshold;
    }

    public void push(int value) {
        if (stacks.isEmpty() || stacks.getLast().size() == threshold) {
            stacks.add(new ArrayDeque<>());
        }
        stacks.getLast().push(value);
    }

    public int pop() {
        if (stacks.isEmpty()) {
            throw new NoSuchElementException("no plates");
        }
        return popAt(stacks.size() - 1);
    }

    /** Pops from one sub-stack; an emptied sub-stack is dropped. */
    public int popAt(int index) {
        if (index < 0 || index >= stacks.size()) {
            throw new IndexOutOfBoundsException(index);
        }
        Deque<Integer> stack = stacks.get(index);
        int value = stack.pop();
        if (stack.isEmpty()) {
            stacks.remove(index);
        }
        return value;
    }

    public int stackCount() {
        return stacks.size();
    }
}
