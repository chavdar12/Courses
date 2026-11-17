import static support.Console.check;

import org.junit.jupiter.api.Test;

class CustomMinFunctionTest {
    @Test
    void findsMinimum() throws Exception {
        check("1", () -> CustomMinFunction.main(new String[0]), "1 4 3 2 1 7 13\n");
    }
}
