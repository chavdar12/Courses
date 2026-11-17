package dsa.searching;

public final class Searching {
    private Searching() {}

    /** O(n): index of the first match, or -1. */
    public static int linearSearch(int[] a, int target) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == target) {
                return i;
            }
        }
        return -1;
    }

    /** O(log n) on a sorted array: index of a match, or -1. */
    public static int binarySearch(int[] sorted, int target) {
        int lo = 0;
        int hi = sorted.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) >>> 1; // no overflow, unlike (lo + hi) / 2
            if (sorted[mid] == target) {
                return mid;
            }
            if (sorted[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }

    /** O(log n): index of the first element not less than target (= insertion point). */
    public static int lowerBound(int[] sorted, int target) {
        int lo = 0;
        int hi = sorted.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (sorted[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
