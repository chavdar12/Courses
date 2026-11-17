package CustomListIterator;

import static support.Console.check;

import org.junit.jupiter.api.Test;

class MainTest {
    @Test
    void printsWithForeachAfterSort() throws Exception {
        check(
                "true\ncc\nbb\naa\naa\nbb\ncc",
                () -> Main.main(new String[0]),
                "Add aa\nAdd bb\nAdd cc\nContains aa\nSwap 0 2\nPrint\nSort\nPrint\nEND\n");
    }
}
