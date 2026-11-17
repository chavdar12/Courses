package dsa.hashing;

import java.util.LinkedList;
import java.util.Objects;

/** Hash map with separate chaining: each bucket is a list of entries. */
public class ChainingHashMap<K, V> {
    private record Entry<K, V>(K key, V value) {}

    private LinkedList<Entry<K, V>>[] buckets = newBuckets(16);
    private int size;

    public V put(K key, V value) {
        LinkedList<Entry<K, V>> bucket = bucket(key);
        for (var it = bucket.listIterator(); it.hasNext(); ) {
            Entry<K, V> e = it.next();
            if (Objects.equals(e.key(), key)) {
                it.set(new Entry<>(key, value));
                return e.value();
            }
        }
        bucket.add(new Entry<>(key, value));
        if (++size > buckets.length * 3 / 4) {
            resize();
        }
        return null;
    }

    public V get(K key) {
        for (Entry<K, V> e : bucket(key)) {
            if (Objects.equals(e.key(), key)) {
                return e.value();
            }
        }
        return null;
    }

    public boolean containsKey(K key) {
        return bucket(key).stream().anyMatch(e -> Objects.equals(e.key(), key));
    }

    public V remove(K key) {
        for (var it = bucket(key).iterator(); it.hasNext(); ) {
            Entry<K, V> e = it.next();
            if (Objects.equals(e.key(), key)) {
                it.remove();
                size--;
                return e.value();
            }
        }
        return null;
    }

    public int size() {
        return size;
    }

    int capacity() {
        return buckets.length;
    }

    private LinkedList<Entry<K, V>> bucket(K key) {
        return buckets[Math.floorMod(Objects.hashCode(key), buckets.length)];
    }

    private void resize() {
        LinkedList<Entry<K, V>>[] old = buckets;
        buckets = newBuckets(old.length * 2);
        for (LinkedList<Entry<K, V>> bucket : old) {
            for (Entry<K, V> e : bucket) {
                bucket(e.key()).add(e);
            }
        }
    }

    @SuppressWarnings("unchecked")
    private static <K, V> LinkedList<Entry<K, V>>[] newBuckets(int n) {
        LinkedList<Entry<K, V>>[] b = new LinkedList[n];
        for (int i = 0; i < n; i++) {
            b[i] = new LinkedList<>();
        }
        return b;
    }
}
