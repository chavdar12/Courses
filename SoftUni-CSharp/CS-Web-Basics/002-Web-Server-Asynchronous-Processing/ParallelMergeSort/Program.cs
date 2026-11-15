using ParallelMergeSort;

// Input: one line of space separated integers. Output: the same numbers sorted.
var numbers = Console.ReadLine()!.Split(' ', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();
MergeSort.Sort(numbers);
Console.WriteLine(string.Join(" ", numbers));
