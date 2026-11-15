import static support.Console.check;

import org.junit.jupiter.api.Test;

class CountRealNumbersTest {
    @Test
    void countsInOrderOfAppearance() throws Exception {
        check(
                "8.0 -> 2\n2.5 -> 3",
                () -> CountRealNumbers.main(new String[0]),
                "8 2.5 2.5 8 2.5\n");
    }
}
