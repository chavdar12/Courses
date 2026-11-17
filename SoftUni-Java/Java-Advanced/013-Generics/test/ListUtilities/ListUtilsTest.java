package ListUtilities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import static support.Console.check;

import org.junit.jupiter.api.Test;

import java.util.List;

class ListUtilsTest {
    @Test
    void minAndMax() {
        assertEquals("c", ListUtils.getMax(List.of("b", "c", "a")));
        assertEquals("a", ListUtils.getMin(List.of("b", "c", "a")));
    }

    @Test
    void emptyListThrows() {
        assertThrows(IllegalArgumentException.class, () -> ListUtils.getMax(List.<Integer>of()));
        assertThrows(IllegalArgumentException.class, () -> ListUtils.getMin(List.<Integer>of()));
    }

    @Test
    void main() throws Exception {
        check("5\n1", () -> Main.main(new String[0]), "");
    }
}
