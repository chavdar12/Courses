package dsa.graph;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import java.util.List;

class GraphTest {
    //  0 - 1 - 3
    //  |   |
    //  2 - 4    5 (isolated)
    private static Graph undirected() {
        Graph g = new Graph(6, false);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(1, 4);
        g.addEdge(2, 4);
        return g;
    }

    @Test
    void bfsVisitsByDistance() {
        assertEquals(List.of(0, 1, 2, 3, 4), undirected().bfs(0));
        assertEquals(List.of(5), undirected().bfs(5));
    }

    @Test
    void dfsGoesDeepFirst() {
        assertEquals(List.of(0, 1, 3, 4, 2), undirected().dfs(0));
    }

    @Test
    void topologicalSortRespectsEveryEdge() {
        Graph g = new Graph(6, true);
        int[][] edges = {{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}};
        for (int[] e : edges) {
            g.addEdge(e[0], e[1]);
        }
        List<Integer> order = g.topologicalSort();
        assertEquals(6, order.size());
        for (int[] e : edges) {
            assertTrue(order.indexOf(e[0]) < order.indexOf(e[1]), e[0] + " before " + e[1]);
        }
    }

    @Test
    void topologicalSortRejectsCyclesAndUndirectedGraphs() {
        Graph cycle = new Graph(3, true);
        cycle.addEdge(0, 1);
        cycle.addEdge(1, 2);
        cycle.addEdge(2, 0);
        assertThrows(IllegalStateException.class, cycle::topologicalSort);
        assertThrows(IllegalStateException.class, () -> undirected().topologicalSort());
    }

    @Test
    void validatesVertices() {
        Graph g = new Graph(2, false);
        assertThrows(IndexOutOfBoundsException.class, () -> g.addEdge(0, 2));
        assertThrows(IndexOutOfBoundsException.class, () -> g.bfs(-1));
        assertThrows(IllegalArgumentException.class, () -> new Graph(-1, true));
        assertTrue(new Graph(0, true).topologicalSort().isEmpty());
    }
}
