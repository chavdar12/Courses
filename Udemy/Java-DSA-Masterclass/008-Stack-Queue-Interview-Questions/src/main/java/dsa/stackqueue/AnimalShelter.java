package dsa.stackqueue;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.NoSuchElementException;

/** Adopt the oldest animal, or the oldest dog or cat. */
public class AnimalShelter {
    public enum Kind {
        DOG,
        CAT
    }

    public record Animal(String name, Kind kind, long arrival) {}

    private final Deque<Animal> dogs = new ArrayDeque<>();
    private final Deque<Animal> cats = new ArrayDeque<>();
    private long clock;

    public void enqueue(String name, Kind kind) {
        Animal animal = new Animal(name, kind, clock++);
        (kind == Kind.DOG ? dogs : cats).addLast(animal);
    }

    public Animal dequeueAny() {
        if (dogs.isEmpty()) {
            return dequeueCat();
        }
        if (cats.isEmpty()) {
            return dequeueDog();
        }
        return dogs.peekFirst().arrival() < cats.peekFirst().arrival()
                ? dequeueDog()
                : dequeueCat();
    }

    public Animal dequeueDog() {
        return take(dogs);
    }

    public Animal dequeueCat() {
        return take(cats);
    }

    private static Animal take(Deque<Animal> queue) {
        if (queue.isEmpty()) {
            throw new NoSuchElementException("no animal to adopt");
        }
        return queue.pollFirst();
    }
}
