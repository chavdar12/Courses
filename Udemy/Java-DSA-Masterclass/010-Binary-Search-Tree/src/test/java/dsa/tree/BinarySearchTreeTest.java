package dsa.tree;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;

class BinarySearchTreeTest {
    private static BinarySearchTree<Integer> sample() {
        BinarySearchTree<Integer> tree = new BinarySearchTree<>();
        for (int v : new int[] {50, 30, 70, 20, 40, 60, 80, 65}) {
            tree.insert(v);
        }
        return tree;
    }

    @Test
    void inOrderIsSorted() {
        BinarySearchTree<Integer> tree = sample();
        assertEquals(List.of(20, 30, 40, 50, 60, 65, 70, 80), tree.inOrder());
        assertEquals(20, tree.min());
        assertEquals(80, tree.max());
        assertEquals(4, tree.height());
    }

    @Test
    void duplicatesAreIgnored() {
        BinarySearchTree<Integer> tree = sample();
        assertFalse(tree.insert(40));
        assertEquals(8, tree.size());
        assertThrows(IllegalArgumentException.class, () -> tree.insert(null));
    }

    @Test
    void deleteLeafOneChildAndTwoChildren() {
        BinarySearchTree<Integer> tree = sample();
        assertTrue(tree.delete(20)); // leaf
        assertTrue(tree.delete(60)); // one child (65)
        assertTrue(tree.delete(50)); // root with two children
        assertEquals(List.of(30, 40, 65, 70, 80), tree.inOrder());
        assertFalse(tree.contains(50));
        assertTrue(tree.contains(65));
        assertFalse(tree.delete(999));
        assertEquals(5, tree.size());
    }

    @Test
    void emptyTree() {
        BinarySearchTree<String> tree = new BinarySearchTree<>();
        assertThrows(NoSuchElementException.class, tree::min);
        assertFalse(tree.contains("a"));
        assertFalse(tree.delete("a"));
        assertEquals(0, tree.height());
    }

    @Test
    void sortedInsertsDegradeToALine() {
        BinarySearchTree<Integer> tree = new BinarySearchTree<>();
        for (int i = 0; i < 10; i++) {
            tree.insert(i);
        }
        assertEquals(10, tree.height()); // why AVL trees exist
    }
}
