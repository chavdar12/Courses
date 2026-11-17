package dsa.tree;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/** Unbalanced binary search tree; duplicates are ignored. */
public class BinarySearchTree<E extends Comparable<E>> {
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

    public boolean insert(E value) {
        if (value == null) {
            throw new IllegalArgumentException("null values cannot be ordered");
        }
        int before = size;
        root = insert(root, value);
        return size > before;
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
        }
        return n;
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

    public boolean delete(E value) {
        int before = size;
        root = delete(root, value);
        return size < before;
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
            // two children: take the in-order successor's value, then delete the successor
            Node<E> successor = n.right;
            while (successor.left != null) {
                successor = successor.left;
            }
            n.value = successor.value;
            n.right = delete(n.right, successor.value);
        }
        return n;
    }

    public E min() {
        Node<E> n = requireRoot();
        while (n.left != null) {
            n = n.left;
        }
        return n.value;
    }

    public E max() {
        Node<E> n = requireRoot();
        while (n.right != null) {
            n = n.right;
        }
        return n.value;
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

    private Node<E> requireRoot() {
        if (root == null) {
            throw new NoSuchElementException("tree is empty");
        }
        return root;
    }

    private static <E> void inOrder(Node<E> n, List<E> out) {
        if (n != null) {
            inOrder(n.left, out);
            out.add(n.value);
            inOrder(n.right, out);
        }
    }

    private static <E> int height(Node<E> n) {
        return n == null ? 0 : 1 + Math.max(height(n.left), height(n.right));
    }
}
