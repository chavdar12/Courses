package dsa.tree;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.List;

class BinaryTreeTest {
    //        1
    //      2   3
    //     4 5 6 7
    private static BinaryTree<Integer> sample() {
        BinaryTree<Integer> tree = new BinaryTree<>();
        for (int i = 1; i <= 7; i++) {
            tree.insert(i);
        }
        return tree;
    }

    @Test
    void traversals() {
        BinaryTree<Integer> tree = sample();
        assertEquals(List.of(1, 2, 4, 5, 3, 6, 7), tree.preOrder());
        assertEquals(List.of(4, 2, 5, 1, 6, 3, 7), tree.inOrder());
        assertEquals(List.of(4, 5, 2, 6, 7, 3, 1), tree.postOrder());
        assertEquals(List.of(1, 2, 3, 4, 5, 6, 7), tree.levelOrder());
        assertEquals(3, tree.height());
        assertEquals(7, tree.size());
    }

    @Test
    void deleteMovesDeepestNodeUp() {
        BinaryTree<Integer> tree = sample();
        assertTrue(tree.delete(2));
        assertEquals(List.of(1, 7, 3, 4, 5, 6), tree.levelOrder());
        assertFalse(tree.contains(2));
        assertFalse(tree.delete(42));
        assertEquals(6, tree.size());
    }

    @Test
    void emptyAndSingleNode() {
        BinaryTree<String> tree = new BinaryTree<>();
        assertEquals(0, tree.height());
        assertTrue(tree.levelOrder().isEmpty());
        assertFalse(tree.delete("x"));
        tree.insert("x");
        assertTrue(tree.delete("x"));
        assertEquals(0, tree.size());
        assertTrue(tree.preOrder().isEmpty());
    }
}
