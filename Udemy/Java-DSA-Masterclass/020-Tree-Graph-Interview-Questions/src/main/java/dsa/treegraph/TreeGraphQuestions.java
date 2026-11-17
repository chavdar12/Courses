package dsa.treegraph;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public final class TreeGraphQuestions {
    private TreeGraphQuestions() {}

    /** Is there a path from start to end in a directed graph? */
    public static <T> boolean routeExists(Map<T, List<T>> graph, T start, T end) {
        Set<T> seen = new HashSet<>(Set.of(start));
        Queue<T> queue = new ArrayDeque<>(List.of(start));
        while (!queue.isEmpty()) {
            T v = queue.remove();
            if (v.equals(end)) {
                return true;
            }
            for (T w : graph.getOrDefault(v, List.of())) {
                if (seen.add(w)) {
                    queue.add(w);
                }
            }
        }
        return false;
    }

    /** A BST of minimal height from a sorted array: the middle becomes the root. */
    public static TreeNode minimalTree(int[] sorted) {
        return minimalTree(sorted, 0, sorted.length - 1);
    }

    private static TreeNode minimalTree(int[] a, int lo, int hi) {
        if (lo > hi) {
            return null;
        }
        int mid = (lo + hi) >>> 1;
        return new TreeNode(a[mid], minimalTree(a, lo, mid - 1), minimalTree(a, mid + 1, hi));
    }

    /** The values on each level, top to bottom. */
    public static List<List<Integer>> listOfDepths(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        Queue<TreeNode> queue = new ArrayDeque<>();
        if (root != null) {
            queue.add(root);
        }
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            for (int i = queue.size(); i > 0; i--) {
                TreeNode n = queue.remove();
                level.add(n.value);
                if (n.left != null) {
                    queue.add(n.left);
                }
                if (n.right != null) {
                    queue.add(n.right);
                }
            }
            levels.add(level);
        }
        return levels;
    }

    public static int height(TreeNode n) {
        return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right));
    }

    /** Subtree heights differ by at most one at every node; O(n). */
    public static boolean isBalanced(TreeNode root) {
        return balancedHeight(root) >= 0;
    }

    private static int balancedHeight(TreeNode n) {
        if (n == null) {
            return 0;
        }
        int l = balancedHeight(n.left);
        int r = balancedHeight(n.right);
        return l < 0 || r < 0 || Math.abs(l - r) > 1 ? -1 : 1 + Math.max(l, r);
    }

    /** Every node lies strictly between the bounds set by its ancestors. */
    public static boolean isValidBst(TreeNode root) {
        return isValidBst(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private static boolean isValidBst(TreeNode n, long min, long max) {
        if (n == null) {
            return true;
        }
        return n.value > min
                && n.value < max
                && isValidBst(n.left, min, n.value)
                && isValidBst(n.right, n.value, max);
    }

    /** The next larger value in a BST, or null. */
    public static TreeNode successor(TreeNode root, int value) {
        TreeNode best = null;
        for (TreeNode n = root; n != null; ) {
            if (n.value > value) {
                best = n;
                n = n.left;
            } else {
                n = n.right;
            }
        }
        return best;
    }

    /** An order to build projects so each comes after its dependencies; throws on a cycle. */
    public static List<String> buildOrder(List<String> projects, List<String[]> dependencies) {
        Map<String, List<String>> dependents = new LinkedHashMap<>();
        Map<String, Integer> waitingOn = new HashMap<>();
        for (String p : projects) {
            dependents.put(p, new ArrayList<>());
            waitingOn.put(p, 0);
        }
        for (String[] d : dependencies) {
            String before = d[0];
            String after = d[1];
            if (!dependents.containsKey(before) || !dependents.containsKey(after)) {
                throw new IllegalArgumentException("unknown project in " + before + " -> " + after);
            }
            dependents.get(before).add(after);
            waitingOn.merge(after, 1, Integer::sum);
        }
        Queue<String> ready = new ArrayDeque<>();
        for (String p : projects) {
            if (waitingOn.get(p) == 0) {
                ready.add(p);
            }
        }
        List<String> order = new ArrayList<>();
        while (!ready.isEmpty()) {
            String p = ready.remove();
            order.add(p);
            for (String next : dependents.get(p)) {
                if (waitingOn.merge(next, -1, Integer::sum) == 0) {
                    ready.add(next);
                }
            }
        }
        if (order.size() != projects.size()) {
            throw new IllegalStateException("dependencies form a cycle");
        }
        return order;
    }

    /** Lowest node with both p and q below it (or being one of them); null if either is missing. */
    public static TreeNode firstCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (!covers(root, p) || !covers(root, q)) {
            return null;
        }
        return ancestor(root, p, q);
    }

    private static TreeNode ancestor(TreeNode n, TreeNode p, TreeNode q) {
        if (n == null || n == p || n == q) {
            return n;
        }
        TreeNode l = ancestor(n.left, p, q);
        TreeNode r = ancestor(n.right, p, q);
        return l != null && r != null ? n : l != null ? l : r;
    }

    private static boolean covers(TreeNode n, TreeNode target) {
        return n != null && (n == target || covers(n.left, target) || covers(n.right, target));
    }
}
