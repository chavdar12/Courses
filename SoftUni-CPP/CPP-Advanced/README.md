# SoftUni C++ Advanced

Solutions for the SoftUni C++ Advanced course: stacks and queues, maps and sets, multidimensional arrays, memory,
references and pointers. One `ExNNN` folder per problem.

## Lectures

| #   | Lecture | Exercises |
| --- | ------- | --------- |
| 001 | Stacks and Queues | [Reverse Words](001-Stacks-And-Queues/Ex001) · [Stack Sum](001-Stacks-And-Queues/Ex002) · [Simple Calculator](001-Stacks-And-Queues/Ex003) · [Matching Brackets](001-Stacks-And-Queues/Ex004) · [Queue Operations](001-Stacks-And-Queues/Ex005) · [Supermarket](001-Stacks-And-Queues/Ex006) · [Hot Potato](001-Stacks-And-Queues/Ex007) |
| 002 | Exercise: Stacks and Queues | [Basic Stack Operations](002-Exercise-Stacks-And-Queues/Ex001) · [Basic Queue Operations](002-Exercise-Stacks-And-Queues/Ex002) · [Maximum and Minimum Element](002-Exercise-Stacks-And-Queues/Ex003) · [Fast Food](002-Exercise-Stacks-And-Queues/Ex004) · [Fashion Boutique](002-Exercise-Stacks-And-Queues/Ex005) · [Truck Tour](002-Exercise-Stacks-And-Queues/Ex006) · [Balanced Parentheses](002-Exercise-Stacks-And-Queues/Ex007) |
| 003 | Map and Set | [Count Real Numbers](003-Map-and-Set/Ex001) · [Average Student Grades](003-Map-and-Set/Ex002) · [Cities by Continent and Country](003-Map-and-Set/Ex003) · [Record Unique Names](003-Map-and-Set/Ex004) · [Parking Lot](003-Map-and-Set/Ex005) · [Unique Usernames](003-Map-and-Set/Ex006) · [Sets of Elements](003-Map-and-Set/Ex007) · [Periodic Table](003-Map-and-Set/Ex008) · [Count Pairs](003-Map-and-Set/Ex009) |
| 004 | Exercise: Map and Set | [Count Real Numbers](004-Exercise-Map-andSet/Ex001) · [Odd Occurrences](004-Exercise-Map-andSet/Ex002) · [Largest 3 Numbers](004-Exercise-Map-andSet/Ex003) · [Short Words Sorted](004-Exercise-Map-andSet/Ex004) · [Sort Numbers](004-Exercise-Map-andSet/Ex005) · [Perfect Squares](004-Exercise-Map-andSet/Ex006) · [A Miner Task](004-Exercise-Map-andSet/Ex007) |
| 005 | Multidimensional Arrays | [Sum Matrix Elements](005-Multidimensional-Arrays/Ex001) · [Primary Diagonal](005-Multidimensional-Arrays/Ex002) · [Symbol in Matrix](005-Multidimensional-Arrays/Ex003) · [Square Matrix](005-Multidimensional-Arrays/Ex004) |
| 006 | Exercise: Multidimensional Arrays | [Compare Matrices](006-Exercise-Multidimensional-Arrays/Ex001) · [Matrix Operations](006-Exercise-Multidimensional-Arrays/Ex002) · [2×2 Squares in Matrix](006-Exercise-Multidimensional-Arrays/Ex003) · [Snake Moves](006-Exercise-Multidimensional-Arrays/Ex004) · [Maximal Sum](006-Exercise-Multidimensional-Arrays/Ex005) · [Reverse Diagonals](006-Exercise-Multidimensional-Arrays/Ex006) · [Fill the Matrix](006-Exercise-Multidimensional-Arrays/Ex007) |
| 007 | Computer Memory, References and Pointers | [Parse Two Integers](007-Computer-Memory-References-Pointers/Ex001) · [Find Company by ID](007-Computer-Memory-References-Pointers/Ex002) · [Sorted Companies](007-Computer-Memory-References-Pointers/Ex003) |
| 008 | Memory Management | [Repeat Words](008-Memory-Management/Ex001) · [Valid Companies](008-Memory-Management/Ex002) |
| 009 | Exercise: Memory Management, References and Pointers | [Gauss Trick](009-Memory-Management-Refrences-and-Pointers-Exercise/Ex001) · [Remove Negatives and Reverse](009-Memory-Management-Refrences-and-Pointers-Exercise/Ex002) · [Print Matrix Parts](009-Memory-Management-Refrences-and-Pointers-Exercise/Ex003) · [Lower / Upper Case with Pointers](009-Memory-Management-Refrences-and-Pointers-Exercise/Ex004) · [Compare Matrices](009-Memory-Management-Refrences-and-Pointers-Exercise/Ex005) · [Minesweeper](009-Memory-Management-Refrences-and-Pointers-Exercise/Ex006) |

## Run

Needs CMake and a C++17 compiler. Every lecture folder is a CMake project; each exercise has `tests/*.in` / `*.out`
pairs that CTest feeds through the program.

```bash
cmake -S 006-Exercise-Multidimensional-Arrays -B build/006-Exercise-Multidimensional-Arrays
cmake --build build/006-Exercise-Multidimensional-Arrays
ctest --test-dir build/006-Exercise-Multidimensional-Arrays --output-on-failure
```

## License

[MIT](LICENSE)
