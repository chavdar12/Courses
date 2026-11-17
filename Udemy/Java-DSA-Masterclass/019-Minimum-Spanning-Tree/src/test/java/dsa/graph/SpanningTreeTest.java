package dsa.graph;

import static org.junit.jupiter.api.Assertions.*;

import dsa.graph.SpanningTree.Edge;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

class SpanningTreeTest {
    private static final List<Edge> EDGES =
            List.of(
                    new Edge(0, 1, 4),
                    new Edge(0, 2, 3),
                    new Edge(1, 2, 1),
                    new Edge(1, 3, 2),
                    new Edge(2, 3, 4),
                    new Edge(3, 4, 2),
                    new Edge(4, 5, 6));

    @Test
    void kruskalAndPrimAgree() {
        SpanningTree.Result k = SpanningTree.kruskal(6, EDGES);
        SpanningTree.Result p = SpanningTree.prim(6, EDGES);
        assertEquals(14, k.totalWeight()); // 1 + 2 + 2 + 3 + 6
        assertEquals(14, p.totalWeight());
        assertEquals(5, k.edges().size());
        assertEquals(5, p.edges().size());
    }

    @Test
    void negativeWeightsAndParallelEdges() {
        List<Edge> edges = List.of(new Edge(0, 1, 5), new Edge(0, 1, -2), new Edge(1, 2, 0));
        assertEquals(-2, SpanningTree.kruskal(3, edges).totalWeight());
        assertEquals(-2, SpanningTree.prim(3, edges).totalWeight());
    }

    @Test
    void randomGraphsAgree() {
        Random random = new Random(11);
        for (int round = 0; round < 30; round++) {
            int n = 2 + random.nextInt(15);
            List<Edge> edges = new ArrayList<>();
            for (int v = 1; v < n; v++) {
                edges.add(new Edge(v, random.nextInt(v), random.nextInt(50))); // keeps it connected
            }
            for (int i = 0; i < n * 2; i++) {
                edges.add(new Edge(random.nextInt(n), random.nextInt(n), random.nextInt(50) - 10));
            }
            assertEquals(
                    SpanningTree.kruskal(n, edges).totalWeight(),
                    SpanningTree.prim(n, edges).totalWeight());
        }
    }

    @Test
    void rejectsDisconnectedGraphsAndBadEdges() {
        assertThrows(
                IllegalArgumentException.class,
                () -> SpanningTree.kruskal(3, List.of(new Edge(0, 1, 1))));
        assertThrows(
                IllegalArgumentException.class,
                () -> SpanningTree.prim(3, List.of(new Edge(0, 1, 1))));
        assertThrows(
                IndexOutOfBoundsException.class,
                () -> SpanningTree.kruskal(2, List.of(new Edge(0, 2, 1))));
        assertEquals(0, SpanningTree.kruskal(1, List.of()).totalWeight());
        assertEquals(0, SpanningTree.prim(0, List.of()).totalWeight());
    }

    @Test
    void disjointSet() {
        DisjointSet sets = new DisjointSet(4);
        assertTrue(sets.union(0, 1));
        assertTrue(sets.union(2, 3));
        assertFalse(sets.union(1, 0));
        assertNotEquals(sets.find(0), sets.find(2));
        assertTrue(sets.union(1, 3));
        assertEquals(sets.find(0), sets.find(2));
    }
}
