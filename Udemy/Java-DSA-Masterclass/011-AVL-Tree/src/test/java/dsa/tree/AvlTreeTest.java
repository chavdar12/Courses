package dsa.tree;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.TreeSet;

class AvlTreeTest {
    @Test
    void sortedInsertsStayLogarithmic() {
        AvlTree<Integer> tree = new AvlTree<>();
        for (int i = 0; i < 1023; i++) {
            tree.insert(i);
        }
        assertEquals(10, tree.height());
        assertTrue(tree.isBalanced());
    }

    @Test
    void allFourRotationCases() {
        int[][] cases = {{3, 2, 1}, {1, 2, 3}, {3, 1, 2}, {1, 3, 2}};
        for (int[] order : cases) {
            AvlTree<Integer> tree = new AvlTree<>();
            for (int v : order) {
                tree.insert(v);
            }
            assertEquals(2, tree.height());
            assertEquals(List.of(1, 2, 3), tree.inOrder());
        }
    }

    @Test
    void randomInsertsAndDeletesMatchATreeSet() {
        Random random = new Random(42);
        AvlTree<Integer> tree = new AvlTree<>();
        TreeSet<Integer> expected = new TreeSet<>();
        for (int i = 0; i < 2000; i++) {
            int v = random.nextInt(500);
            if (random.nextBoolean()) {
                assertEquals(expected.add(v), tree.insert(v));
            } else {
                assertEquals(expected.remove(v), tree.delete(v));
            }
            if (i % 100 == 0) {
                assertTrue(tree.isBalanced());
            }
        }
        assertEquals(new ArrayList<>(expected), tree.inOrder());
        assertEquals(expected.size(), tree.size());
        assertTrue(tree.isBalanced());
    }

    @Test
    void deleteEverything() {
        AvlTree<Integer> tree = new AvlTree<>();
        List<Integer> values = new ArrayList<>(List.of(5, 1, 9, 3, 7, 2, 8));
        values.forEach(tree::insert);
        Collections.shuffle(values, new Random(1));
        for (int v : values) {
            assertTrue(tree.delete(v));
            assertTrue(tree.isBalanced());
            assertFalse(tree.contains(v));
        }
        assertEquals(0, tree.size());
        assertEquals(0, tree.height());
    }
}
