# HackerRank C++

My solutions to the [HackerRank C++ track](https://www.hackerrank.com/domains/cpp), one header per problem, each with
GoogleTest tests.

| Topic                                      | Problems |
| ------------------------------------------ | -------- |
| [Introduction](solutions/introduction)     | 9        |
| [Strings](solutions/strings)               | 3        |
| [Classes](solutions/classes)               | 8        |
| [STL](solutions/stl)                       | 7        |
| [Inheritance](solutions/inheritance)       | 5        |
| [Other Concepts](solutions/other_concepts) | 8        |
| [Debugging](solutions/debugging)           | 4        |
| [Algorithms](solutions/algorithms)         | 2        |

Tests live in [`tests/`](tests), one executable per test file, because several solutions define classes with the same
name.

## Run the tests

```bash
cmake -S . -B build
cmake --build build -j
ctest --test-dir build --output-on-failure
```

CMake downloads GoogleTest on the first configure. CI builds the same way with AddressSanitizer and UBSan.
