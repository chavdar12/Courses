package dsa.greedy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

/** Problems where the locally best choice is also globally best. */
public final class Greedy {
    public record Activity(String name, int start, int finish) {}

    public record Item(double weight, double value) {}

    private Greedy() {}

    /** The most non-overlapping activities: always take the one that finishes first. */
    public static List<Activity> activitySelection(List<Activity> activities) {
        List<Activity> sorted = new ArrayList<>(activities);
        sorted.sort(Comparator.comparingInt(Activity::finish));
        List<Activity> chosen = new ArrayList<>();
        int freeAt = Integer.MIN_VALUE;
        for (Activity a : sorted) {
            if (a.start() > a.finish()) {
                throw new IllegalArgumentException(a.name() + " ends before it starts");
            }
            if (a.start() >= freeAt) {
                chosen.add(a);
                freeAt = a.finish();
            }
        }
        return chosen;
    }

    /**
     * Coins for an amount, largest first. Optimal only for canonical coin systems such as euro
     * coins; see the dynamic-programming section for the general case.
     */
    public static List<Integer> coinChange(int[] coins, int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("amount must not be negative");
        }
        int[] sorted = coins.clone();
        Arrays.sort(sorted);
        List<Integer> used = new ArrayList<>();
        for (int i = sorted.length - 1; i >= 0 && amount > 0; i--) {
            if (sorted[i] <= 0) {
                throw new IllegalArgumentException("coins must be positive");
            }
            while (amount >= sorted[i]) {
                amount -= sorted[i];
                used.add(sorted[i]);
            }
        }
        if (amount != 0) {
            throw new IllegalArgumentException("amount cannot be made from these coins");
        }
        return used;
    }

    /** Best value when items can be split: take by value per weight. */
    public static double fractionalKnapsack(List<Item> items, double capacity) {
        if (capacity < 0) {
            throw new IllegalArgumentException("capacity must not be negative");
        }
        List<Item> sorted = new ArrayList<>(items);
        sorted.sort(Comparator.comparingDouble((Item i) -> i.value() / i.weight()).reversed());
        double total = 0;
        for (Item item : sorted) {
            if (item.weight() <= 0) {
                throw new IllegalArgumentException("weights must be positive");
            }
            if (capacity <= 0) {
                break;
            }
            double taken = Math.min(item.weight(), capacity);
            total += item.value() * taken / item.weight();
            capacity -= taken;
        }
        return total;
    }
}
