package Tuple;

import org.junit.jupiter.api.Test;

import static support.Console.check;

class MainTest {
    @Test
    void printsEachTuple() throws Exception {
        check("Sofka Tripova -> Stolipinovo\nAz -> 2\n23 -> 21.23212321", () -> Main.main(new String[0]),
                "Sofka Tripova Stolipinovo\nAz 2\n23 21.23212321\n");
    }

    @Test
    void addressMayHaveSpaces() throws Exception {
        check("Ivan Ivanov -> 12 Main Street\nPesho -> 5\n1 -> 0.5", () -> Main.main(new String[0]),
                "Ivan Ivanov 12 Main Street\nPesho 5\n1 0.5\n");
    }
}
