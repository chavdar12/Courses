package GenericCountMethodDouble;

import static support.Console.check;

import org.junit.jupiter.api.Test;

class MainTest {
    @Test
    void countsGreaterDoubles() throws Exception {
        check("2", () -> Main.main(new String[0]), "3\n7.13\n123.22\n42.78\n42.64\n");
    }
}
