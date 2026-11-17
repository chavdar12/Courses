package dsa.trie;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/** Prefix tree of words; children are kept sorted so listings come out alphabetical. */
public class Trie {
    private static final class Node {
        final Map<Character, Node> children = new TreeMap<>();
        boolean endOfWord;
    }

    private final Node root = new Node();
    private int size;

    public boolean insert(String word) {
        requireWord(word);
        Node n = root;
        for (char c : word.toCharArray()) {
            n = n.children.computeIfAbsent(c, k -> new Node());
        }
        if (n.endOfWord) {
            return false;
        }
        n.endOfWord = true;
        size++;
        return true;
    }

    public boolean contains(String word) {
        Node n = find(word);
        return n != null && n.endOfWord;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    /** Removes a word and prunes nodes no other word uses. */
    public boolean delete(String word) {
        requireWord(word);
        boolean[] removed = {false};
        delete(root, word, 0, removed);
        if (removed[0]) {
            size--;
        }
        return removed[0];
    }

    /** True when the caller can drop this node. */
    private static boolean delete(Node n, String word, int depth, boolean[] removed) {
        if (depth == word.length()) {
            if (!n.endOfWord) {
                return false;
            }
            n.endOfWord = false;
            removed[0] = true;
            return n.children.isEmpty();
        }
        char c = word.charAt(depth);
        Node child = n.children.get(c);
        if (child == null) {
            return false;
        }
        if (delete(child, word, depth + 1, removed)) {
            n.children.remove(c);
        }
        return !n.endOfWord && n.children.isEmpty();
    }

    public List<String> wordsWithPrefix(String prefix) {
        List<String> out = new ArrayList<>();
        Node n = find(prefix);
        if (n != null) {
            collect(n, new StringBuilder(prefix), out);
        }
        return out;
    }

    public int size() {
        return size;
    }

    private static void collect(Node n, StringBuilder word, List<String> out) {
        if (n.endOfWord) {
            out.add(word.toString());
        }
        for (Map.Entry<Character, Node> e : n.children.entrySet()) {
            word.append(e.getKey());
            collect(e.getValue(), word, out);
            word.deleteCharAt(word.length() - 1);
        }
    }

    private Node find(String prefix) {
        Node n = root;
        for (char c : prefix.toCharArray()) {
            n = n.children.get(c);
            if (n == null) {
                return null;
            }
        }
        return n;
    }

    private static void requireWord(String word) {
        if (word == null || word.isEmpty()) {
            throw new IllegalArgumentException("word must not be empty");
        }
    }
}
