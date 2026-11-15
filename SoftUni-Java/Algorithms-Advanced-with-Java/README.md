# SoftUni Algorithms Advanced with Java

Solutions for the SoftUni Algorithms Advanced with Java course: Dijkstra and minimum spanning trees, Bellman-Ford and
longest path in a DAG, strongly connected components and max flow, and advanced dynamic programming.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | Graphs: Topological Sorting, MST | **Lab:** [Dijkstra](001-Graphs-Topological-Sorting-MST/Lab/src/main/java/Dijkstra.java) · [Kruskal Algorithm](001-Graphs-Topological-Sorting-MST/Lab/src/main/java/KruskalAlgorithm.java) |
| 002 | Graphs: Bellman-Ford, Longest Path in DAG | **Lab:** [Bellman Ford](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Lab/src/main/java/BellmanFord.java) · [Longest Path](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Lab/src/main/java/LongestPath.java)<br>**Exercise:** [Big Trip](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Exercise/src/main/java/BigTrip.java) · [Cable Network](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Exercise/src/main/java/CableNetwork.java) · [Cheap Town Tour](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Exercise/src/main/java/CheapTownTour.java) · [Modified Kruskal Algorithm](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Exercise/src/main/java/ModifiedKruskalAlgorithm.java) · [Most Reliable Path](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Exercise/src/main/java/MostReliablePath.java) · [Undefined](002-Graphs-Bellman-Ford-Longest-PathIn-DAG/Exercise/src/main/java/Undefined.java) |
| 003 | Graphs: Strongly Connected Components, Max Flow | **Lab:** [Articulation Points](003-Graphs-Strongly-Connected-Components-Max-Flow/Lab/src/main/java/ArticulationPoints.java) · [Edmonds Karp](003-Graphs-Strongly-Connected-Components-Max-Flow/Lab/src/main/java/EdmondsKarp.java) · [Strongly Connected Components](003-Graphs-Strongly-Connected-Components-Max-Flow/Lab/src/main/java/StronglyConnectedComponents.java)<br>**Exercise:** [Find Bi Connected Components](003-Graphs-Strongly-Connected-Components-Max-Flow/Exercise/src/main/java/FindBiConnectedComponents.java) · [Maximum Tasks Assignment](003-Graphs-Strongly-Connected-Components-Max-Flow/Exercise/src/main/java/MaximumTasksAssignment.java) |
| 004 | Dynamic Programming Advanced | **Lab:** [Knapsack](004-Dynamic-Programming-Advanced/Lab/src/main/java/Knapsack.java) · [Longest Common Subsequence](004-Dynamic-Programming-Advanced/Lab/src/main/java/LongestCommonSubsequence.java)<br>**Exercise:** [Abaspa Basapa](004-Dynamic-Programming-Advanced/Exercise/src/main/java/AbaspaBasapa.java) · [Rectangle Intersection](004-Dynamic-Programming-Advanced/Exercise/src/main/java/RectangleIntersection.java) · [The Mad Gardener](004-Dynamic-Programming-Advanced/Exercise/src/main/java/TheMadGardener.java) · [Zigzag Matrix](004-Dynamic-Programming-Advanced/Exercise/src/main/java/ZigzagMatrix.java) |

## Run

Needs JDK 25. Every lecture is its own Gradle project with a wrapper and JUnit tests.

```bash
cd 002-Graphs-Bellman-Ford-Longest-PathIn-DAG
./gradlew build      # compiles and runs the tests
```

Or open the lecture folder in IntelliJ IDEA and run a class's `main`.

## License

[MIT](LICENSE)
