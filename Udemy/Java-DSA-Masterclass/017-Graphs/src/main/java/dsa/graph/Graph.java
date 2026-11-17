package dsa.graph;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Queue;

/** Graph on vertices 0..n-1 stored as adjacency lists. */
public class Graph {
    private final List<List<Integer>> adjacency = new ArrayList<>();
    private final boolean directed;

    public Graph(int vertices, boolean directed) {
        if (vertices < 0) {
            throw new IllegalArgumentException("vertex count must not be negative");
        }
        this.directed = directed;
        for (int i = 0; i < vertices; i++) {
            adjacency.add(new ArrayList<>());
        }
    }

    public void addEdge(int from, int to) {
        check(from);
        check(to);
        adjacency.get(from).add(to);
        if (!directed) {
            adjacency.get(to).add(from);
        }
    }

    public List<Integer> neighbours(int v) {
        check(v);
        return List.copyOf(adjacency.get(v));
    }

    public int size() {
        return adjacency.size();
    }

    /** Vertices reachable from start, nearest first. */
    public List<Integer> bfs(int start) {
        check(start);
        boolean[] seen = new boolean[size()];
        List<Integer> order = new ArrayList<>();
        Queue<Integer> queue = new ArrayDeque<>(List.of(start));
        seen[start] = true;
        while (!queue.isEmpty()) {
            int v = queue.remove();
            order.add(v);
            for (int w : adjacency.get(v)) {
                if (!seen[w]) {
                    seen[w] = true;
                    queue.add(w);
                }
            }
        }
        return order;
    }

    /** Vertices reachable from start, going deep first; iterative, so no stack overflow. */
    public List<Integer> dfs(int start) {
        check(start);
        boolean[] seen = new boolean[size()];
        List<Integer> order = new ArrayList<>();
        Deque<Integer> stack = new ArrayDeque<>(List.of(start));
        while (!stack.isEmpty()) {
            int v = stack.pop();
            if (seen[v]) {
                continue;
            }
            seen[v] = true;
            order.add(v);
            List<Integer> next = adjacency.get(v);
            // push in reverse so neighbours are visited in insertion order
            for (int i = next.size() - 1; i >= 0; i--) {
                if (!seen[next.get(i)]) {
                    stack.push(next.get(i));
                }
            }
        }
        return order;
    }

    /** Kahn's algorithm; throws if the graph has a cycle. */
    public List<Integer> topologicalSort() {
        if (!directed) {
            throw new IllegalStateException("topological order needs a directed graph");
        }
        int[] inDegree = new int[size()];
        for (List<Integer> edges : adjacency) {
            for (int w : edges) {
                inDegree[w]++;
            }
        }
        Queue<Integer> ready = new ArrayDeque<>();
        for (int v = 0; v < size(); v++) {
            if (inDegree[v] == 0) {
                ready.add(v);
            }
        }
        List<Integer> order = new ArrayList<>();
        while (!ready.isEmpty()) {
            int v = ready.remove();
            order.add(v);
            for (int w : adjacency.get(v)) {
                if (--inDegree[w] == 0) {
                    ready.add(w);
                }
            }
        }
        if (order.size() != size()) {
            throw new IllegalStateException("graph has a cycle");
        }
        return order;
    }

    private void check(int v) {
        if (v < 0 || v >= size()) {
            throw new IndexOutOfBoundsException("no vertex " + v);
        }
    }
}
