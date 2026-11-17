package dsa.treegraph;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

class TreeGraphQuestionsTest {
    @Test
    void routeExists() {
        Map<String, List<String>> graph =
                Map.of("a", List.of("b"), "b", List.of("c"), "c", List.of("a"), "d", List.of("a"));
        assertTrue(TreeGraphQuestions.routeExists(graph, "a", "c"));
        assertTrue(TreeGraphQuestions.routeExists(graph, "d", "c"));
        assertFalse(TreeGraphQuestions.routeExists(graph, "a", "d"));
        assertTrue(TreeGraphQuestions.routeExists(graph, "x", "x"));
    }

    @Test
    void minimalTreeIsBalancedAndValid() {
        int[] sorted = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        TreeNode root = TreeGraphQuestions.minimalTree(sorted);
        assertEquals(4, TreeGraphQuestions.height(root));
        assertTrue(TreeGraphQuestions.isBalanced(root));
        assertTrue(TreeGraphQuestions.isValidBst(root));
        assertNull(TreeGraphQuestions.minimalTree(new int[0]));
    }

    @Test
    void listOfDepths() {
        TreeNode root = TreeGraphQuestions.minimalTree(new int[] {1, 2, 3, 4, 5, 6, 7});
        assertEquals(
                List.of(List.of(4), List.of(2, 6), List.of(1, 3, 5, 7)),
                TreeGraphQuestions.listOfDepths(root));
        assertTrue(TreeGraphQuestions.listOfDepths(null).isEmpty());
    }

    @Test
    void isBalancedCatchesDeepImbalance() {
        // both children of the root have height 2, but the left child itself is unbalanced
        TreeNode root =
                new TreeNode(
                        1,
                        new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
                        new TreeNode(5, new TreeNode(6), null));
        assertFalse(TreeGraphQuestions.isBalanced(root));
        assertTrue(TreeGraphQuestions.isBalanced(null));
    }

    @Test
    void isValidBstChecksAncestorsNotJustParents() {
        // 3 is a valid left child of 5 locally, but it sits in 10's right subtree
        TreeNode bad = new TreeNode(10, new TreeNode(5), new TreeNode(15, new TreeNode(3), null));
        assertFalse(TreeGraphQuestions.isValidBst(bad));
        assertFalse(
                TreeGraphQuestions.isValidBst(
                        new TreeNode(2, new TreeNode(2), null))); // no duplicates
        assertTrue(
                TreeGraphQuestions.isValidBst(
                        new TreeNode(Integer.MAX_VALUE, new TreeNode(Integer.MIN_VALUE), null)));
    }

    @Test
    void successor() {
        TreeNode root = TreeGraphQuestions.minimalTree(new int[] {10, 20, 30, 40, 50});
        assertEquals(30, TreeGraphQuestions.successor(root, 20).value);
        assertEquals(40, TreeGraphQuestions.successor(root, 35).value);
        assertNull(TreeGraphQuestions.successor(root, 50));
    }

    @Test
    void buildOrder() {
        List<String> projects = List.of("a", "b", "c", "d", "e", "f");
        List<String[]> deps =
                List.of(
                        new String[] {"a", "d"},
                        new String[] {"f", "b"},
                        new String[] {"b", "d"},
                        new String[] {"f", "a"},
                        new String[] {"d", "c"});
        List<String> order = TreeGraphQuestions.buildOrder(projects, deps);
        for (String[] d : deps) {
            assertTrue(order.indexOf(d[0]) < order.indexOf(d[1]));
        }
        assertEquals(6, order.size());
        assertThrows(
                IllegalStateException.class,
                () ->
                        TreeGraphQuestions.buildOrder(
                                List.of("a", "b"),
                                List.of(new String[] {"a", "b"}, new String[] {"b", "a"})));
        assertThrows(
                IllegalArgumentException.class,
                () ->
                        TreeGraphQuestions.buildOrder(
                                List.of("a"), List.<String[]>of(new String[] {"a", "z"})));
    }

    @Test
    void firstCommonAncestor() {
        TreeNode four = new TreeNode(4);
        TreeNode five = new TreeNode(5);
        TreeNode two = new TreeNode(2, four, five);
        TreeNode six = new TreeNode(6);
        TreeNode root = new TreeNode(1, two, new TreeNode(3, six, null));
        assertSame(two, TreeGraphQuestions.firstCommonAncestor(root, four, five));
        assertSame(root, TreeGraphQuestions.firstCommonAncestor(root, four, six));
        assertSame(two, TreeGraphQuestions.firstCommonAncestor(root, two, five));
        assertNull(TreeGraphQuestions.firstCommonAncestor(root, four, new TreeNode(4)));
    }
}
