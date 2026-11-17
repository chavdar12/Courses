package dsa.graph;

import static dsa.graph.ShortestPaths.UNREACHABLE;

import static org.junit.jupiter.api.Assertions.*;

import dsa.graph.ShortestPaths.Edge;

import org.junit.jupiter.api.Test;

import java.util.List;

class ShortestPathsTest {
    // 0 -4-> 1, 0 -1-> 2, 2 -2-> 1, 1 -1-> 3, 2 -5-> 3; vertex 4 is unreachable
    private static final List<Edge> EDGES =
            List.of(
                    new Edge(0, 1, 4),
                    new Edge(0, 2, 1),
                    new Edge(2, 1, 2),
                    new Edge(1, 3, 1),
                    new Edge(2, 3, 5));

    @Test
    void bfsPathUsesFewestEdges() {
        List<List<Integer>> adj =
                List.of(List.of(1, 2), List.of(3), List.of(3), List.of(), List.of());
        assertEquals(List.of(0, 1, 3), ShortestPaths.bfsPath(adj, 0, 3));
        assertEquals(List.of(2), ShortestPaths.bfsPath(adj, 2, 2));
        assertTrue(ShortestPaths.bfsPath(adj, 0, 4).isEmpty());
    }

    @Test
    void dijkstra() {
        assertArrayEquals(
                new long[] {0, 3, 1, 4, UNREACHABLE}, ShortestPaths.dijkstra(5, EDGES, 0));
        assertThrows(
                IllegalArgumentException.class,
                () -> ShortestPaths.dijkstra(2, List.of(new Edge(0, 1, -1)), 0));
        assertThrows(IndexOutOfBoundsException.class, () -> ShortestPaths.dijkstra(2, EDGES, 0));
    }

    @Test
    void bellmanFordHandlesNegativeWeights() {
        assertArrayEquals(
                ShortestPaths.dijkstra(5, EDGES, 0), ShortestPaths.bellmanFord(5, EDGES, 0));
        List<Edge> negative = List.of(new Edge(0, 1, 5), new Edge(0, 2, 2), new Edge(1, 2, -4));
        assertArrayEquals(new long[] {0, 5, 1}, ShortestPaths.bellmanFord(3, negative, 0));
    }

    @Test
    void bellmanFordDetectsNegativeCycles() {
        List<Edge> cycle = List.of(new Edge(0, 1, 1), new Edge(1, 2, -1), new Edge(2, 1, -1));
        assertThrows(IllegalStateException.class, () -> ShortestPaths.bellmanFord(3, cycle, 0));
        // an unreachable negative cycle does not matter
        assertArrayEquals(
                new long[] {0, UNREACHABLE, UNREACHABLE},
                ShortestPaths.bellmanFord(3, List.of(new Edge(1, 2, -1), new Edge(2, 1, -1)), 0));
    }

    @Test
    void floydWarshallAllPairs() {
        long[][] dist = ShortestPaths.floydWarshall(5, EDGES);
        for (int source = 0; source < 5; source++) {
            assertArrayEquals(ShortestPaths.dijkstra(5, EDGES, source), dist[source]);
        }
        assertThrows(
                IllegalStateException.class,
                () ->
                        ShortestPaths.floydWarshall(
                                2, List.of(new Edge(0, 1, 1), new Edge(1, 0, -2))));
    }
}
