package GenericCountMethodString;

import static support.Console.check;

import org.junit.jupiter.api.Test;

class MainTest {
    @Test
    void countsGreaterStrings() throws Exception {
        check("2", () -> Main.main(new String[0]), "3\naa\naaa\nbb\naa\n");
    }
}
