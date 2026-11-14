namespace Ex010;

internal class Program
{
    private static void Main(string[] args)
    {
        var size = Console.ReadLine().Split().Select(int.Parse).ToArray();
        var matrix = new string[size[0]][];
        for (var row = 0; row < size[0]; row++)
            matrix[row] = Console.ReadLine().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        var squares = 0;
        for (var row = 0; row < size[0] - 1; row++)
        for (var col = 0; col < size[1] - 1; col++)
        {
            var cell = matrix[row][col];
            if (matrix[row][col + 1] == cell && matrix[row + 1][col] == cell && matrix[row + 1][col + 1] == cell)
                squares++;
        }

        Console.WriteLine(squares);
    }
}
