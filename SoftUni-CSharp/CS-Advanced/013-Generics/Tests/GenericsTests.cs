using static CS_Advanced.Tests.ProgramRunner;

namespace CS_Advanced.Tests;

public class GenericsTests
{
    private const string Module = "013-Generics.";

    [Fact]
    public void Ex001_GenericArrayCreator() => AssertOutput(Module + "Ex001", "",
        string.Join("\n", Enumerable.Repeat("Pesho", 5).Concat(Enumerable.Repeat("33", 10))));

    [Fact]
    public void Ex002_BoxOfTRemovesTopmost() => AssertOutput(Module + "Ex002", "", "3\n5");

    [Fact]
    public void Ex003_GenericScale() => AssertOutput(Module + "Ex003", "", "True");
}
