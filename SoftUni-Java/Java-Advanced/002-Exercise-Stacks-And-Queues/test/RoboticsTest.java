import static support.Console.check;

import org.junit.jupiter.api.Test;

class RoboticsTest {
    @Test
    void productWaitsForTheFirstFreeRobot() throws Exception {
        check(
                "ROB - detail [08:00:01]\nSS2 - glass [08:00:02]\nNX8000 - wood [08:00:03]\nNX8000 - apple [08:00:06]",
                () -> Robotics.main(new String[0]),
                "ROB-15;SS2-10;NX8000-3\n8:00:00\ndetail\nglass\nwood\napple\nEnd\n");
    }

    @Test
    void waitingProductsRotateToTheEndOfTheLine() throws Exception {
        // 59 seconds of waiting rotate [glass, wood, sock] twice, so sock is next when ROB frees up
        check(
                "ROB - detail [08:00:00]\nROB - sock [08:01:00]\nROB - wood [08:02:00]\nROB - glass [08:03:00]",
                () -> Robotics.main(new String[0]),
                "ROB-60\n7:59:59\ndetail\nglass\nwood\nsock\nEnd\n");
    }

    @Test
    void clockWrapsAtMidnight() throws Exception {
        check("A - x [00:00:00]", () -> Robotics.main(new String[0]), "A-1\n23:59:59\nx\nEnd\n");
    }
}
