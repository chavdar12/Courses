package bg.softuni.implementations;

import static org.junit.Assert.*;

import org.junit.Test;

public class BalancedParenthesesTest {
    @Test
    public void zeroTestOne() {
        String input = "{[()]}";
        Boolean solve = new BalancedParentheses(input).solve();
        assertNotNull(solve);
        assertTrue(solve);
    }

    @Test
    public void zeroTestTwo() {
        String input = "{[(])}";
        Boolean solve = new BalancedParentheses(input).solve();
        assertNotNull(solve);
        assertFalse(solve);
    }

    @Test
    public void closingBracketFirstIsNotBalanced() {
        assertFalse(new BalancedParentheses(")(").solve());
    }
}
