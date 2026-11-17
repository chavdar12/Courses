# Java Data Structures and Algorithms Masterclass

My solutions for the Udemy course
[Java Data Structures and Algorithms Masterclass](https://www.udemy.com/course/java-data-structures-and-algorithms-masterclass/)
by Elshad Karimov: every data structure written by hand, the classic algorithms, and the interview questions, each with
JUnit tests. Written from scratch in Java 25.

| #   | Section                          | Source                                                                                                | Covers                                                                                                   |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 001 | Big O                            | [bigo](001-Big-O/src/main/java/dsa/bigo)                                                              | O(1), O(log n), O(sqrt n), O(n) and O(n²) examples                                                       |
| 002 | Recursion                        | [recursion](002-Recursion/src/main/java/dsa/recursion)                                                | factorial, Fibonacci, sum of digits, fast power, GCD, decimal to binary                                  |
| 003 | Recursion interview questions    | [recursion](003-Recursion-Interview-Questions/src/main/java/dsa/recursion)                            | product, range, reverse, palindrome, some, flatten, capitalize, nested even sum, collect strings         |
| 004 | Arrays                           | [arrays](004-Arrays/src/main/java/dsa/arrays)                                                         | missing number, two sum, max product, unique, permutation, rotate matrix, best score, max profit         |
| 005 | Linked lists                     | [linkedlist](005-Linked-Lists/src/main/java/dsa/linkedlist)                                           | singly, doubly and circular linked lists                                                                 |
| 006 | Linked list interview questions  | [linkedlist](006-Linked-List-Interview-Questions/src/main/java/dsa/linkedlist)                        | remove duplicates, n-th to last, partition, sum lists, intersection                                      |
| 007 | Stack and queue                  | [stackqueue](007-Stack-And-Queue/src/main/java/dsa/stackqueue)                                        | array and linked stacks, circular array queue, linked queue                                              |
| 008 | Stack and queue interview questions | [stackqueue](008-Stack-Queue-Interview-Questions/src/main/java/dsa/stackqueue)                     | three in one, min stack, stack of plates, queue via stacks, animal shelter                               |
| 009 | Binary tree                      | [tree](009-Binary-Tree/src/main/java/dsa/tree)                                                        | level-order insert, pre/in/post/level-order traversal, delete via the deepest node                       |
| 010 | Binary search tree               | [tree](010-Binary-Search-Tree/src/main/java/dsa/tree)                                                 | insert, search, delete with the in-order successor, min / max                                            |
| 011 | AVL tree                         | [tree](011-AVL-Tree/src/main/java/dsa/tree)                                                           | all four rotations on insert and delete                                                                  |
| 012 | Binary heap                      | [heap](012-Binary-Heap/src/main/java/dsa/heap)                                                        | min-heap and max-heap from one comparator-driven heap                                                    |
| 013 | Trie                             | [trie](013-Trie/src/main/java/dsa/trie)                                                               | insert, search, prefix search, delete with pruning                                                       |
| 014 | Hashing                          | [hashing](014-Hashing/src/main/java/dsa/hashing)                                                      | separate chaining and linear probing with tombstones                                                     |
| 015 | Sorting                          | [sorting](015-Sorting/src/main/java/dsa/sorting)                                                      | bubble, selection, insertion, bucket, merge, quick and heap sort                                         |
| 016 | Searching                        | [searching](016-Searching/src/main/java/dsa/searching)                                                | linear search, binary search, lower bound                                                                |
| 017 | Graphs                           | [graph](017-Graphs/src/main/java/dsa/graph)                                                           | adjacency lists, BFS, DFS, topological sort with cycle detection                                         |
| 018 | Shortest paths                   | [graph](018-Shortest-Paths/src/main/java/dsa/graph)                                                   | BFS path, Dijkstra, Bellman-Ford and Floyd-Warshall with negative-cycle detection                        |
| 019 | Minimum spanning tree            | [graph](019-Minimum-Spanning-Tree/src/main/java/dsa/graph)                                            | disjoint set, Kruskal, Prim                                                                              |
| 020 | Tree and graph interview questions | [treegraph](020-Tree-Graph-Interview-Questions/src/main/java/dsa/treegraph)                         | route between nodes, minimal tree, list of depths, balanced, valid BST, successor, build order, common ancestor |
| 021 | Greedy algorithms                | [greedy](021-Greedy-Algorithms/src/main/java/dsa/greedy)                                              | activity selection, coin change, fractional knapsack                                                     |
| 022 | Divide and conquer               | [divideconquer](022-Divide-And-Conquer/src/main/java/dsa/divideconquer)                               | number factor, house robber, edit distance, 0/1 knapsack, LCS, LPS, min-cost path                        |
| 023 | Dynamic programming              | [dp](023-Dynamic-Programming/src/main/java/dsa/dp)                                                    | top-down and bottom-up versions of the above, minimum coins, longest increasing subsequence              |

Not included: the course's quizzes and its long list of extra LeetCode-style practice problems.

## Run

Needs JDK 25. The whole course is one Gradle build; every section is a subproject with its own JUnit tests.

```bash
./gradlew build                    # every section
./gradlew :015-Sorting:test        # one section
```

## License

[MIT](LICENSE)
