package GenericBox;

import static support.Console.check;

import org.junit.jupiter.api.Test;

class MainTest {
    @Test
    void printsTypeAndValue() throws Exception {
        check(
                "java.lang.String: life in a box\njava.lang.String: s",
                () -> Main.main(new String[0]),
                "2\nlife in a box\ns\n");
    }
}
