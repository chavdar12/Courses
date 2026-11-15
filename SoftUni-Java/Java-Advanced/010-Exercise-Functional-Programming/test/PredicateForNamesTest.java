import static support.Console.check;

import org.junit.jupiter.api.Test;

class PredicateForNamesTest {
    @Test
    void keepsShortNames() throws Exception {
        check(
                "Geo\nMuk\nIvan",
                () -> PredicateForNames.main(new String[0]),
                "4\nKurnelia Qnaki Geo Muk Ivan\n");
    }
}
