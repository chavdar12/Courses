namespace ParallelMergeSort;

public static class MergeSort
{
    // Each split level doubles the tasks; stop splitting once every core has work.
    private static readonly int MaxParallelDepth = (int)Math.Ceiling(Math.Log2(Environment.ProcessorCount));

    // Below this size a task costs more than it saves.
    private const int ParallelThreshold = 4096;

    public static void Sort(int[] items) => Sort(items, new int[items.Length], 0, items.Length, MaxParallelDepth);

    // Sorts items[from..to). The halves never overlap, so they can run in parallel on the shared arrays.
    private static void Sort(int[] items, int[] buffer, int from, int to, int depth)
    {
        if (to - from < 2)
            return;

        var middle = from + (to - from) / 2;
        if (depth > 0 && to - from >= ParallelThreshold)
        {
            Parallel.Invoke(
                () => Sort(items, buffer, from, middle, depth - 1),
                () => Sort(items, buffer, middle, to, depth - 1)
            );
        }
        else
        {
            Sort(items, buffer, from, middle, 0);
            Sort(items, buffer, middle, to, 0);
        }

        Merge(items, buffer, from, middle, to);
    }

    private static void Merge(int[] items, int[] buffer, int from, int middle, int to)
    {
        Array.Copy(items, from, buffer, from, to - from);

        int left = from,
            right = middle;
        for (var i = from; i < to; i++)
        {
            items[i] =
                right >= to || (left < middle && buffer[left] <= buffer[right]) ? buffer[left++] : buffer[right++];
        }
    }
}
