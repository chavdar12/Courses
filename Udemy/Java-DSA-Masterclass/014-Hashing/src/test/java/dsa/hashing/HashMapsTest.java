package dsa.hashing;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

class HashMapsTest {
    /** Keys that all share one hash code, to force collisions. */
    private record Colliding(int id) {
        @Override
        public int hashCode() {
            return 7;
        }
    }

    @Test
    void chainingPutGetRemove() {
        ChainingHashMap<String, Integer> map = new ChainingHashMap<>();
        assertNull(map.put("a", 1));
        assertEquals(1, map.put("a", 2));
        map.put(null, 0);
        assertEquals(2, map.get("a"));
        assertEquals(0, map.get(null));
        assertEquals(2, map.remove("a"));
        assertNull(map.get("a"));
        assertFalse(map.containsKey("a"));
        assertEquals(1, map.size());
    }

    @Test
    void chainingGrowsAndHandlesCollisions() {
        ChainingHashMap<Colliding, Integer> map = new ChainingHashMap<>();
        for (int i = 0; i < 100; i++) {
            map.put(new Colliding(i), i);
        }
        assertTrue(map.capacity() > 16);
        for (int i = 0; i < 100; i++) {
            assertEquals(i, map.get(new Colliding(i)));
        }
    }

    @Test
    void probingFindsKeysPastTombstones() {
        LinearProbingHashMap<Colliding, String> map = new LinearProbingHashMap<>();
        map.put(new Colliding(1), "one");
        map.put(new Colliding(2), "two");
        map.put(new Colliding(3), "three");
        assertEquals("two", map.remove(new Colliding(2)));
        assertEquals("three", map.get(new Colliding(3))); // probe continues over the tombstone
        assertNull(map.get(new Colliding(2)));
        map.put(new Colliding(4), "four");
        assertEquals(3, map.size());
        assertThrows(IllegalArgumentException.class, () -> map.put(null, "x"));
    }

    @Test
    void bothMatchJavaHashMapUnderRandomOperations() {
        Random random = new Random(3);
        Map<Integer, Integer> expected = new HashMap<>();
        ChainingHashMap<Integer, Integer> chaining = new ChainingHashMap<>();
        LinearProbingHashMap<Integer, Integer> probing = new LinearProbingHashMap<>();
        for (int i = 0; i < 5000; i++) {
            int key = random.nextInt(300) - 150;
            switch (random.nextInt(3)) {
                case 0 -> {
                    assertEquals(expected.put(key, i), chaining.put(key, i));
                    probing.put(key, i);
                }
                case 1 -> {
                    assertEquals(expected.get(key), chaining.get(key));
                    assertEquals(expected.get(key), probing.get(key));
                }
                default -> {
                    Integer removed = expected.remove(key);
                    assertEquals(removed, chaining.remove(key));
                    assertEquals(removed, probing.remove(key));
                }
            }
        }
        assertEquals(expected.size(), chaining.size());
        assertEquals(expected.size(), probing.size());
    }
}
