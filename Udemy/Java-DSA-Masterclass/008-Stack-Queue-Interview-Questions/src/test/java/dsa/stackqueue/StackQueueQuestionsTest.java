package dsa.stackqueue;

import static org.junit.jupiter.api.Assertions.*;

import dsa.stackqueue.AnimalShelter.Kind;

import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;

class StackQueueQuestionsTest {
    @Test
    void threeInOneKeepsStacksApart() {
        ThreeInOne stacks = new ThreeInOne(2);
        stacks.push(0, 1);
        stacks.push(1, 10);
        stacks.push(2, 100);
        stacks.push(0, 2);
        assertThrows(IllegalStateException.class, () -> stacks.push(0, 3));
        assertEquals(2, stacks.pop(0));
        assertEquals(10, stacks.peek(1));
        assertEquals(100, stacks.pop(2));
        assertTrue(stacks.isEmpty(2));
        assertThrows(NoSuchElementException.class, () -> stacks.pop(2));
        assertThrows(IllegalArgumentException.class, () -> stacks.push(3, 1));
    }

    @Test
    void minStackTracksMinimumThroughPops() {
        MinStack stack = new MinStack();
        stack.push(5);
        stack.push(6);
        stack.push(3);
        stack.push(3);
        stack.push(7);
        assertEquals(3, stack.min());
        stack.pop();
        stack.pop();
        assertEquals(3, stack.min()); // duplicate minimum still on the stack
        stack.pop();
        assertEquals(5, stack.min());
        stack.pop();
        stack.pop();
        assertThrows(NoSuchElementException.class, stack::min);
    }

    @Test
    void setOfStacksSplitsAndPopsAt() {
        SetOfStacks plates = new SetOfStacks(2);
        for (int i = 1; i <= 5; i++) {
            plates.push(i);
        }
        assertEquals(3, plates.stackCount());
        assertEquals(5, plates.pop());
        assertEquals(2, plates.stackCount());
        assertEquals(2, plates.popAt(0));
        assertEquals(1, plates.popAt(0));
        assertEquals(1, plates.stackCount());
        assertEquals(4, plates.pop());
        assertEquals(3, plates.pop());
        assertThrows(NoSuchElementException.class, plates::pop);
        assertThrows(IllegalArgumentException.class, () -> new SetOfStacks(0));
    }

    @Test
    void queueViaStacksIsFifo() {
        QueueViaStacks<Integer> queue = new QueueViaStacks<>();
        queue.enqueue(1);
        queue.enqueue(2);
        assertEquals(1, queue.dequeue());
        queue.enqueue(3);
        assertEquals(2, queue.peek());
        assertEquals(2, queue.dequeue());
        assertEquals(3, queue.dequeue());
        assertEquals(0, queue.size());
        assertThrows(NoSuchElementException.class, queue::dequeue);
    }

    @Test
    void shelterHandsOutOldestFirst() {
        AnimalShelter shelter = new AnimalShelter();
        shelter.enqueue("Rex", Kind.DOG);
        shelter.enqueue("Tom", Kind.CAT);
        shelter.enqueue("Fido", Kind.DOG);
        assertEquals("Tom", shelter.dequeueCat().name());
        assertEquals("Rex", shelter.dequeueAny().name());
        assertEquals("Fido", shelter.dequeueAny().name());
        assertThrows(NoSuchElementException.class, shelter::dequeueAny);
    }
}
