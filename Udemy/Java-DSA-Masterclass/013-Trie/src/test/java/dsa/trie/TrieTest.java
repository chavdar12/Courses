package dsa.trie;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.List;

class TrieTest {
    private static Trie sample() {
        Trie trie = new Trie();
        for (String w : List.of("api", "apple", "app", "bat", "bath")) {
            trie.insert(w);
        }
        return trie;
    }

    @Test
    void searchAndPrefixes() {
        Trie trie = sample();
        assertTrue(trie.contains("app"));
        assertFalse(trie.contains("ap"));
        assertTrue(trie.startsWith("ap"));
        assertFalse(trie.startsWith("c"));
        assertEquals(List.of("api", "app", "apple"), trie.wordsWithPrefix("ap"));
        assertEquals(List.of("bat", "bath"), trie.wordsWithPrefix("ba"));
        assertTrue(trie.wordsWithPrefix("z").isEmpty());
        assertFalse(trie.insert("app"));
        assertEquals(5, trie.size());
    }

    @Test
    void deleteKeepsSharedPrefixes() {
        Trie trie = sample();
        assertTrue(trie.delete("app"));
        assertFalse(trie.contains("app"));
        assertTrue(trie.contains("apple")); // longer word through the same nodes survives
        assertTrue(trie.delete("bath"));
        assertTrue(trie.contains("bat"));
        assertTrue(trie.delete("bat"));
        assertFalse(trie.startsWith("b")); // nothing left under b, so its nodes were pruned
        assertFalse(trie.delete("bat"));
        assertFalse(trie.delete("missing"));
        assertEquals(2, trie.size());
    }

    @Test
    void rejectsEmptyWords() {
        Trie trie = new Trie();
        assertThrows(IllegalArgumentException.class, () -> trie.insert(""));
        assertThrows(IllegalArgumentException.class, () -> trie.insert(null));
        assertTrue(trie.startsWith("")); // empty prefix matches everything
    }
}
