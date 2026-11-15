# SoftUni Data Structures Fundamentals with Java

Solutions for the SoftUni Data Structures Fundamentals with Java course: hand-written array lists, linked lists, stacks,
queues, deques, trees with BFS / DFS, heaps, priority queues and binary search trees, each with JUnit tests.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | Linear Data Structures | [source](001-Linear-Data-Structures/src/main/java/bg/softuni): ArrayList · LinkedList · List · Queue · SinglyLinkedList · Stack |
| 002 | Exercise: Linear Data Structures | [source](002-Exercise-Linear-Data-Structures/src/main/java/bg/softuni): ArrayDeque · BalancedParentheses · Deque · DoublyLinkedList · LinkedList · Queue · ReversedList |
| 003 | Trees: Representation and Traversal (BFS, DFS) | [Trees: Representation and Traversal (BFS, DFS)](003-Trees-Representation-And-Traversal-Bfs-Dfs/src/main/java/bg/softuni) |
| 004 | Exercise: Trees: Representation and Traversal (BFS, DFS) | [Exercise: Trees: Representation and Traversal (BFS, DFS)](004-Exercise-Trees-Representation-And-Traversal-Bfs-Dfs/src/main/java/bg/softuni) |
| 005 | Heaps and BST | [Heaps and BST](005-Heaps-Bst/src/main/java/bg/softuni) |
| 006 | Exercise: Heaps and BST | [Exercise: Heaps and BST](006-Exercise-Heaps-Bst/src/main/java/bg/softuni) |

## Run

Needs JDK 25. Every lecture is its own Gradle project with a wrapper and JUnit tests.

```bash
cd 005-Heaps-Bst
./gradlew build      # compiles and runs the tests
```

Or open the lecture folder in IntelliJ IDEA and run a class's `main`.

## License

[MIT](LICENSE)
