package dsa.greedy;

import static org.junit.jupiter.api.Assertions.*;

import dsa.greedy.Greedy.Activity;
import dsa.greedy.Greedy.Item;

import org.junit.jupiter.api.Test;

import java.util.List;

class GreedyTest {
    @Test
    void activitySelectionPicksEarliestFinish() {
        List<Activity> activities =
                List.of(
                        new Activity("a1", 0, 6),
                        new Activity("a2", 3, 4),
                        new Activity("a3", 1, 2),
                        new Activity("a4", 5, 8),
                        new Activity("a5", 5, 7),
                        new Activity("a6", 8, 9));
        List<String> names =
                Greedy.activitySelection(activities).stream().map(Activity::name).toList();
        assertEquals(List.of("a3", "a2", "a5", "a6"), names);
        assertTrue(Greedy.activitySelection(List.of()).isEmpty());
        assertThrows(
                IllegalArgumentException.class,
                () -> Greedy.activitySelection(List.of(new Activity("x", 5, 1))));
    }

    @Test
    void coinChange() {
        int[] euro = {1, 2, 5, 10, 20, 50, 100, 200};
        assertEquals(List.of(200, 50, 20, 5, 2), Greedy.coinChange(euro, 277));
        assertTrue(Greedy.coinChange(euro, 0).isEmpty());
        assertThrows(IllegalArgumentException.class, () -> Greedy.coinChange(new int[] {5}, 3));
        assertThrows(IllegalArgumentException.class, () -> Greedy.coinChange(euro, -1));
        // greedy is not optimal for every coin system: 6 = 4 + 1 + 1 instead of 3 + 3
        assertEquals(List.of(4, 1, 1), Greedy.coinChange(new int[] {1, 3, 4}, 6));
    }

    @Test
    void fractionalKnapsack() {
        List<Item> items = List.of(new Item(10, 60), new Item(20, 100), new Item(30, 120));
        assertEquals(240, Greedy.fractionalKnapsack(items, 50), 1e-9);
        assertEquals(0, Greedy.fractionalKnapsack(items, 0), 1e-9);
        assertEquals(280, Greedy.fractionalKnapsack(items, 1000), 1e-9);
        assertThrows(
                IllegalArgumentException.class,
                () -> Greedy.fractionalKnapsack(List.of(new Item(0, 5)), 1));
    }
}
