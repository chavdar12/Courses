package dsa.graph;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;

/** Shortest paths on vertices 0..n-1. Unreachable vertices get {@link #UNREACHABLE}. */
public final class ShortestPaths {
    public static final long UNREACHABLE = Long.MAX_VALUE;

    public record Edge(int from, int to, long weight) {}

    private ShortestPaths() {}

    /** Fewest-edges path in an unweighted directed graph, or an empty list. */
    public static List<Integer> bfsPath(List<List<Integer>> adjacency, int source, int target) {
        int n = adjacency.size();
        check(n, source);
        check(n, target);
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        boolean[] seen = new boolean[n];
        seen[source] = true;
        Queue<Integer> queue = new ArrayDeque<>(List.of(source));
        while (!queue.isEmpty()) {
            int v = queue.remove();
            if (v == target) {
                List<Integer> path = new ArrayList<>();
                for (int u = target; u != -1; u = parent[u]) {
                    path.add(u);
                }
                Collections.reverse(path);
                return path;
            }
            for (int w : adjacency.get(v)) {
                if (!seen[w]) {
                    seen[w] = true;
                    parent[w] = v;
                    queue.add(w);
                }
            }
        }
        return List.of();
    }

    /** O((V + E) log V); weights must not be negative. */
    public static long[] dijkstra(int n, List<Edge> edges, int source) {
        check(n, source);
        List<List<Edge>> out = adjacency(n, edges);
        for (Edge e : edges) {
            if (e.weight() < 0) {
                throw new IllegalArgumentException("Dijkstra cannot handle negative weights");
            }
        }
        long[] dist = new long[n];
        Arrays.fill(dist, UNREACHABLE);
        dist[source] = 0;
        PriorityQueue<long[]> queue = new PriorityQueue<>((a, b) -> Long.compare(a[1], b[1]));
        queue.add(new long[] {source, 0});
        while (!queue.isEmpty()) {
            long[] top = queue.remove();
            int v = (int) top[0];
            if (top[1] > dist[v]) {
                continue; // stale entry: a shorter path was already found
            }
            for (Edge e : out.get(v)) {
                long candidate = dist[v] + e.weight();
                if (candidate < dist[e.to()]) {
                    dist[e.to()] = candidate;
                    queue.add(new long[] {e.to(), candidate});
                }
            }
        }
        return dist;
    }

    /** O(V * E); allows negative weights, throws on a reachable negative cycle. */
    public static long[] bellmanFord(int n, List<Edge> edges, int source) {
        check(n, source);
        adjacency(n, edges); // validates the edges
        long[] dist = new long[n];
        Arrays.fill(dist, UNREACHABLE);
        dist[source] = 0;
        for (int round = 0; round < n; round++) {
            boolean changed = false;
            for (Edge e : edges) {
                if (dist[e.from()] != UNREACHABLE && dist[e.from()] + e.weight() < dist[e.to()]) {
                    dist[e.to()] = dist[e.from()] + e.weight();
                    changed = true;
                }
            }
            if (!changed) {
                return dist;
            }
        }
        // still relaxing after n rounds: some path keeps getting shorter
        throw new IllegalStateException("graph has a negative cycle reachable from the source");
    }

    /** O(V^3) all-pairs distances; throws on a negative cycle. */
    public static long[][] floydWarshall(int n, List<Edge> edges) {
        adjacency(n, edges);
        long[][] dist = new long[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], UNREACHABLE);
            dist[i][i] = 0;
        }
        for (Edge e : edges) {
            dist[e.from()][e.to()] = Math.min(dist[e.from()][e.to()], e.weight());
        }
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] != UNREACHABLE
                            && dist[k][j] != UNREACHABLE
                            && dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        for (int i = 0; i < n; i++) {
            if (dist[i][i] < 0) {
                throw new IllegalStateException("graph has a negative cycle");
            }
        }
        return dist;
    }

    private static List<List<Edge>> adjacency(int n, List<Edge> edges) {
        List<List<Edge>> out = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            out.add(new ArrayList<>());
        }
        for (Edge e : edges) {
            check(n, e.from());
            check(n, e.to());
            out.get(e.from()).add(e);
        }
        return out;
    }

    private static void check(int n, int v) {
        if (v < 0 || v >= n) {
            throw new IndexOutOfBoundsException("no vertex " + v);
        }
    }
}
