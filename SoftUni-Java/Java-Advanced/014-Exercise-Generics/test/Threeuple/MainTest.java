package Threeuple;

import org.junit.jupiter.api.Test;

import static support.Console.check;

class MainTest {
    @Test
    void printsEachThreeuple() throws Exception {
        check("Sofka Tripova -> Stolipinovo -> Plovdiv\nMitkoShtaigata -> 18 -> true\nSashoKompota -> 0.1 -> NGTV",
                () -> Main.main(new String[0]),
                "Sofka Tripova Stolipinovo Plovdiv\nMitkoShtaigata 18 drunk\nSashoKompota 0.10 NGTV\n");
    }

    @Test
    void notDrunkAndMultiWordAddress() throws Exception {
        check("Ivan Ivanov -> 12 Main Street -> Sofia\nPesho -> 2 -> false\nGosho -> 100.5 -> DSK",
                () -> Main.main(new String[0]),
                "Ivan Ivanov 12 Main Street Sofia\nPesho 2 not\nGosho 100.5 DSK\n");
    }
}
