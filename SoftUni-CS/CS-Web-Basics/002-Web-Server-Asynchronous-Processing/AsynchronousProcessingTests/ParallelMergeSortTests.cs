using ParallelMergeSort;

namespace AsynchronousProcessingTests;

public class ParallelMergeSortTests
{
    [TestCase(0)]
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(10000)]
    [TestCase(1000000)]
    public void SortsLikeArraySort(int length)
    {
        var random = new Random(length);
        var items = Enumerable.Range(0, length).Select(_ => random.Next(-1000, 1000)).ToArray();
        var expected = items.Order().ToArray();

        MergeSort.Sort(items);

        Assert.That(items, Is.EqualTo(expected));
    }

    [Test]
    public void ProgramPrintsSortedNumbers()
    {
        Assert.That(ConsoleRunner.Run(typeof(MergeSort).Assembly, "5 -1 3 3 0"), Is.EqualTo("-1 0 3 3 5"));
    }
}
