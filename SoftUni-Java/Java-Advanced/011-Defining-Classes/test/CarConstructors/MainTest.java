package CarConstructors;

import static support.Console.check;

import org.junit.jupiter.api.Test;

class MainTest {
    @Test
    void missingModelAndPowerUseDefaults() throws Exception {
        check(
                """
                The car is: Chevrolet unknown - -1 HP.
                The car is: Mercedes Benz - 500 HP.
                """,
                () -> Main.main(new String[0]),
                "2\nChevrolet\nMercedes Benz 500\n");
    }
}
