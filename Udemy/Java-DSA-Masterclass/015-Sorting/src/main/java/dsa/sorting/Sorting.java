package dsa.sorting;

import java.util.ArrayList;
import java.util.List;

/** Each method sorts the array in place, ascending. */
public final class Sorting {
    private Sorting() {}

    /** O(n^2); stops early once a pass makes no swaps. */
    public static void bubbleSort(int[] a) {
        for (int end = a.length - 1; end > 0; end--) {
            boolean swapped = false;
            for (int i = 0; i < end; i++) {
                if (a[i] > a[i + 1]) {
                    swap(a, i, i + 1);
                    swapped = true;
                }
            }
            if (!swapped) {
                return;
            }
        }
    }

    /** O(n^2); at most n swaps. */
    public static void selectionSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int min = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] < a[min]) {
                    min = j;
                }
            }
            swap(a, i, min);
        }
    }

    /** O(n^2), O(n) on nearly sorted input. */
    public static void insertionSort(int[] a) {
        for (int i = 1; i < a.length; i++) {
            int value = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > value) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = value;
        }
    }

    /** Spreads values over sqrt(n) buckets by range, sorts each, then concatenates. */
    public static void bucketSort(int[] a) {
        if (a.length < 2) {
            return;
        }
        int min = a[0];
        int max = a[0];
        for (int v : a) {
            min = Math.min(min, v);
            max = Math.max(max, v);
        }
        int count = (int) Math.ceil(Math.sqrt(a.length));
        long range = (long) max - min + 1;
        List<List<Integer>> buckets = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            buckets.add(new ArrayList<>());
        }
        for (int v : a) {
            buckets.get((int) (((long) v - min) * count / range)).add(v);
        }
        int k = 0;
        for (List<Integer> bucket : buckets) {
            int[] b = bucket.stream().mapToInt(Integer::intValue).toArray();
            insertionSort(b);
            for (int v : b) {
                a[k++] = v;
            }
        }
    }

    /** O(n log n), stable, O(n) extra space. */
    public static void mergeSort(int[] a) {
        if (a.length > 1) {
            mergeSort(a, new int[a.length], 0, a.length);
        }
    }

    private static void mergeSort(int[] a, int[] tmp, int from, int to) {
        if (to - from < 2) {
            return;
        }
        int mid = (from + to) >>> 1;
        mergeSort(a, tmp, from, mid);
        mergeSort(a, tmp, mid, to);
        int i = from;
        int j = mid;
        int k = from;
        while (i < mid && j < to) {
            tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
        }
        while (i < mid) {
            tmp[k++] = a[i++];
        }
        while (j < to) {
            tmp[k++] = a[j++];
        }
        System.arraycopy(tmp, from, a, from, to - from);
    }

    /** O(n log n) on average; the middle element as pivot avoids the sorted-input worst case. */
    public static void quickSort(int[] a) {
        quickSort(a, 0, a.length - 1);
    }

    private static void quickSort(int[] a, int lo, int hi) {
        while (lo < hi) {
            int pivot = a[(lo + hi) >>> 1];
            int i = lo;
            int j = hi;
            while (i <= j) {
                while (a[i] < pivot) {
                    i++;
                }
                while (a[j] > pivot) {
                    j--;
                }
                if (i <= j) {
                    swap(a, i++, j--);
                }
            }
            // recurse into the smaller half, loop on the larger: stack depth stays O(log n)
            if (j - lo < hi - i) {
                quickSort(a, lo, j);
                lo = i;
            } else {
                quickSort(a, i, hi);
                hi = j;
            }
        }
    }

    /** O(n log n), in place: build a max-heap, then move the max to the end n times. */
    public static void heapSort(int[] a) {
        for (int i = a.length / 2 - 1; i >= 0; i--) {
            siftDown(a, i, a.length);
        }
        for (int end = a.length - 1; end > 0; end--) {
            swap(a, 0, end);
            siftDown(a, 0, end);
        }
    }

    private static void siftDown(int[] a, int i, int size) {
        while (2 * i + 1 < size) {
            int child = 2 * i + 1;
            if (child + 1 < size && a[child + 1] > a[child]) {
                child++;
            }
            if (a[i] >= a[child]) {
                return;
            }
            swap(a, i, child);
            i = child;
        }
    }

    private static void swap(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}
