package dsa.tree;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Queue;

/** Linked binary tree filled level by level, as a complete tree. */
public class BinaryTree<E> {
    private static final class Node<E> {
        E value;
        Node<E> left;
        Node<E> right;

        Node(E value) {
            this.value = value;
        }
    }

    private Node<E> root;
    private int size;

    /** Puts the value in the first free slot found by a level-order walk. */
    public void insert(E value) {
        Node<E> node = new Node<>(value);
        size++;
        if (root == null) {
            root = node;
            return;
        }
        Queue<Node<E>> queue = new ArrayDeque<>(List.of(root));
        while (true) {
            Node<E> n = queue.remove();
            if (n.left == null) {
                n.left = node;
                return;
            }
            if (n.right == null) {
                n.right = node;
                return;
            }
            queue.add(n.left);
            queue.add(n.right);
        }
    }

    public boolean contains(E value) {
        for (E e : levelOrder()) {
            if (Objects.equals(e, value)) {
                return true;
            }
        }
        return false;
    }

    /** Replaces the value with the deepest node's value, then drops the deepest node. */
    public boolean delete(E value) {
        if (root == null) {
            return false;
        }
        Node<E> target = null;
        Node<E> deepest = null;
        Node<E> deepestParent = null;
        Queue<Node<E>> queue = new ArrayDeque<>(List.of(root));
        while (!queue.isEmpty()) {
            Node<E> n = queue.remove();
            if (target == null && Objects.equals(n.value, value)) {
                target = n;
            }
            deepest = n;
            for (Node<E> child : childrenOf(n)) {
                deepestParent = n;
                queue.add(child);
            }
        }
        if (target == null) {
            return false;
        }
        target.value = deepest.value;
        if (deepestParent == null) {
            root = null;
        } else if (deepestParent.right == deepest) {
            deepestParent.right = null;
        } else {
            deepestParent.left = null;
        }
        size--;
        return true;
    }

    public List<E> preOrder() {
        List<E> out = new ArrayList<>();
        preOrder(root, out);
        return out;
    }

    public List<E> inOrder() {
        List<E> out = new ArrayList<>();
        inOrder(root, out);
        return out;
    }

    public List<E> postOrder() {
        List<E> out = new ArrayList<>();
        postOrder(root, out);
        return out;
    }

    public List<E> levelOrder() {
        List<E> out = new ArrayList<>();
        if (root == null) {
            return out;
        }
        Queue<Node<E>> queue = new ArrayDeque<>(List.of(root));
        while (!queue.isEmpty()) {
            Node<E> n = queue.remove();
            out.add(n.value);
            queue.addAll(childrenOf(n));
        }
        return out;
    }

    /** Number of levels; an empty tree has height 0. */
    public int height() {
        return height(root);
    }

    public int size() {
        return size;
    }

    private static <E> List<Node<E>> childrenOf(Node<E> n) {
        List<Node<E>> children = new ArrayList<>(2);
        if (n.left != null) {
            children.add(n.left);
        }
        if (n.right != null) {
            children.add(n.right);
        }
        return children;
    }

    private static <E> int height(Node<E> n) {
        return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right));
    }

    private static <E> void preOrder(Node<E> n, List<E> out) {
        if (n != null) {
            out.add(n.value);
            preOrder(n.left, out);
            preOrder(n.right, out);
        }
    }

    private static <E> void inOrder(Node<E> n, List<E> out) {
        if (n != null) {
            inOrder(n.left, out);
            out.add(n.value);
            inOrder(n.right, out);
        }
    }

    private static <E> void postOrder(Node<E> n, List<E> out) {
        if (n != null) {
            postOrder(n.left, out);
            postOrder(n.right, out);
            out.add(n.value);
        }
    }
}
