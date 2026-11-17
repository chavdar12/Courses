package dsa.graph;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

/** Minimum spanning trees of an undirected weighted graph on vertices 0..n-1. */
public final class SpanningTree {
    public record Edge(int a, int b, long weight) {}

    public record Result(long totalWeight, List<Edge> edges) {}

    private SpanningTree() {}

    /** Cheapest edges first, skipping any that would close a cycle. */
    public static Result kruskal(int n, List<Edge> edges) {
        validate(n, edges);
        List<Edge> sorted = new ArrayList<>(edges);
        sorted.sort(Comparator.comparingLong(Edge::weight));
        DisjointSet sets = new DisjointSet(n);
        List<Edge> tree = new ArrayList<>();
        long total = 0;
        for (Edge e : sorted) {
            if (sets.union(e.a(), e.b())) {
                tree.add(e);
                total += e.weight();
            }
        }
        return finish(n, total, tree);
    }

    /** Grows one tree from vertex 0, always adding the cheapest edge leaving it. */
    public static Result prim(int n, List<Edge> edges) {
        validate(n, edges);
        List<List<Edge>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (Edge e : edges) {
            adjacency.get(e.a()).add(e);
            adjacency.get(e.b()).add(e);
        }
        boolean[] inTree = new boolean[n];
        PriorityQueue<Edge> queue = new PriorityQueue<>(Comparator.comparingLong(Edge::weight));
        List<Edge> tree = new ArrayList<>();
        long total = 0;
        if (n > 0) {
            inTree[0] = true;
            queue.addAll(adjacency.get(0));
        }
        while (!queue.isEmpty()) {
            Edge e = queue.remove();
            int next = inTree[e.a()] ? e.b() : e.a();
            if (inTree[next]) {
                continue;
            }
            inTree[next] = true;
            tree.add(e);
            total += e.weight();
            queue.addAll(adjacency.get(next));
        }
        return finish(n, total, tree);
    }

    private static Result finish(int n, long total, List<Edge> tree) {
        if (n > 0 && tree.size() != n - 1) {
            throw new IllegalArgumentException("graph is not connected");
        }
        return new Result(total, tree);
    }

    private static void validate(int n, List<Edge> edges) {
        for (Edge e : edges) {
            if (e.a() < 0 || e.a() >= n || e.b() < 0 || e.b() >= n) {
                throw new IndexOutOfBoundsException("edge outside 0.." + (n - 1) + ": " + e);
            }
        }
    }
}
