package dsa.tree;

import java.util.ArrayList;
import java.util.List;

/** Self-balancing BST: after every change, subtree heights differ by at most one. */
public class AvlTree<E extends Comparable<E>> {
    private static final class Node<E> {
        E value;
        Node<E> left;
        Node<E> right;
        int height = 1;

        Node(E value) {
            this.value = value;
        }
    }

    private Node<E> root;
    private int size;

    public boolean insert(E value) {
        if (value == null) {
            throw new IllegalArgumentException("null values cannot be ordered");
        }
        int before = size;
        root = insert(root, value);
        return size > before;
    }

    public boolean delete(E value) {
        int before = size;
        root = delete(root, value);
        return size < before;
    }

    public boolean contains(E value) {
        Node<E> n = root;
        while (n != null) {
            int cmp = value.compareTo(n.value);
            if (cmp == 0) {
                return true;
            }
            n = cmp < 0 ? n.left : n.right;
        }
        return false;
    }

    public List<E> inOrder() {
        List<E> out = new ArrayList<>();
        inOrder(root, out);
        return out;
    }

    public int height() {
        return height(root);
    }

    public int size() {
        return size;
    }

    /** Checks the AVL invariant on every node (used by the tests). */
    public boolean isBalanced() {
        return checkBalanced(root) >= 0;
    }

    private Node<E> insert(Node<E> n, E value) {
        if (n == null) {
            size++;
            return new Node<>(value);
        }
        int cmp = value.compareTo(n.value);
        if (cmp < 0) {
            n.left = insert(n.left, value);
        } else if (cmp > 0) {
            n.right = insert(n.right, value);
        } else {
            return n;
        }
        return rebalance(n);
    }

    private Node<E> delete(Node<E> n, E value) {
        if (n == null) {
            return null;
        }
        int cmp = value.compareTo(n.value);
        if (cmp < 0) {
            n.left = delete(n.left, value);
        } else if (cmp > 0) {
            n.right = delete(n.right, value);
        } else if (n.left == null || n.right == null) {
            size--;
            return n.left == null ? n.right : n.left;
        } else {
            Node<E> successor = n.right;
            while (successor.left != null) {
                successor = successor.left;
            }
            n.value = successor.value;
            n.right = delete(n.right, successor.value);
        }
        return rebalance(n);
    }

    private Node<E> rebalance(Node<E> n) {
        update(n);
        int balance = height(n.left) - height(n.right);
        if (balance > 1) {
            if (height(n.left.left) < height(n.left.right)) {
                n.left = rotateLeft(n.left); // left-right case
            }
            return rotateRight(n);
        }
        if (balance < -1) {
            if (height(n.right.right) < height(n.right.left)) {
                n.right = rotateRight(n.right); // right-left case
            }
            return rotateLeft(n);
        }
        return n;
    }

    private Node<E> rotateRight(Node<E> n) {
        Node<E> l = n.left;
        n.left = l.right;
        l.right = n;
        update(n);
        update(l);
        return l;
    }

    private Node<E> rotateLeft(Node<E> n) {
        Node<E> r = n.right;
        n.right = r.left;
        r.left = n;
        update(n);
        update(r);
        return r;
    }

    private void update(Node<E> n) {
        n.height = 1 + Math.max(height(n.left), height(n.right));
    }

    private static <E> int height(Node<E> n) {
        return n == null ? 0 : n.height;
    }

    /** Height of a balanced subtree, or -1 if any node breaks the invariant. */
    private static <E> int checkBalanced(Node<E> n) {
        if (n == null) {
            return 0;
        }
        int l = checkBalanced(n.left);
        int r = checkBalanced(n.right);
        if (l < 0 || r < 0 || Math.abs(l - r) > 1) {
            return -1;
        }
        return 1 + Math.max(l, r);
    }

    private static <E> void inOrder(Node<E> n, List<E> out) {
        if (n != null) {
            inOrder(n.left, out);
            out.add(n.value);
            inOrder(n.right, out);
        }
    }
}
