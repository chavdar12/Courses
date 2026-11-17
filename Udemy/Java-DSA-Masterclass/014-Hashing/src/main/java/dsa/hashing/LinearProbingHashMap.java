package dsa.hashing;

/**
 * Open addressing with linear probing. Removed slots become tombstones so that lookups keep probing
 * past them.
 */
public class LinearProbingHashMap<K, V> {
    private static final Object TOMBSTONE = new Object();

    private Object[] keys = new Object[16];
    private Object[] values = new Object[16];
    private int size;
    private int used; // live entries plus tombstones

    public V put(K key, V value) {
        requireKey(key);
        if ((used + 1) * 2 > keys.length) {
            resize(size * 2 > keys.length / 2 ? keys.length * 2 : keys.length);
        }
        int firstFree = -1;
        int i = index(key, keys.length);
        while (keys[i] != null) {
            if (keys[i] == TOMBSTONE) {
                if (firstFree < 0) {
                    firstFree = i;
                }
            } else if (keys[i].equals(key)) {
                @SuppressWarnings("unchecked")
                V old = (V) values[i];
                values[i] = value;
                return old;
            }
            i = (i + 1) % keys.length;
        }
        if (firstFree >= 0) {
            i = firstFree; // reuse a tombstone instead of growing the probe chain
        } else {
            used++;
        }
        keys[i] = key;
        values[i] = value;
        size++;
        return null;
    }

    @SuppressWarnings("unchecked")
    public V get(K key) {
        int i = find(key);
        return i < 0 ? null : (V) values[i];
    }

    public boolean containsKey(K key) {
        return find(key) >= 0;
    }

    @SuppressWarnings("unchecked")
    public V remove(K key) {
        int i = find(key);
        if (i < 0) {
            return null;
        }
        V old = (V) values[i];
        keys[i] = TOMBSTONE;
        values[i] = null;
        size--;
        return old;
    }

    public int size() {
        return size;
    }

    private int find(K key) {
        requireKey(key);
        int i = index(key, keys.length);
        while (keys[i] != null) {
            if (keys[i] != TOMBSTONE && keys[i].equals(key)) {
                return i;
            }
            i = (i + 1) % keys.length;
        }
        return -1;
    }

    @SuppressWarnings("unchecked")
    private void resize(int capacity) {
        Object[] oldKeys = keys;
        Object[] oldValues = values;
        keys = new Object[capacity];
        values = new Object[capacity];
        size = 0;
        used = 0;
        for (int i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] != null && oldKeys[i] != TOMBSTONE) {
                put((K) oldKeys[i], (V) oldValues[i]);
            }
        }
    }

    private static int index(Object key, int length) {
        return Math.floorMod(key.hashCode(), length);
    }

    private static void requireKey(Object key) {
        if (key == null) {
            throw new IllegalArgumentException("keys must not be null");
        }
    }
}
