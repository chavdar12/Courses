import java.util.ArrayDeque;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Scanner;

public class Robotics {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        Map<String, Integer> processingTimes = new LinkedHashMap<>();
        for (String robot : scanner.nextLine().split(";")) {
            String[] tokens = robot.split("-");
            processingTimes.put(tokens[0], Integer.parseInt(tokens[1]));
        }
        // second at which each robot is free again (0 = free from the start)
        Map<String, Integer> busyUntil = new LinkedHashMap<>();
        processingTimes.keySet().forEach(name -> busyUntil.put(name, 0));

        String[] time = scanner.nextLine().split(":");
        int seconds = Integer.parseInt(time[0]) * 3600 + Integer.parseInt(time[1]) * 60 + Integer.parseInt(time[2]);

        ArrayDeque<String> products = new ArrayDeque<>();
        String product = scanner.nextLine();
        while (!product.equals("End")) {
            products.offer(product);
            product = scanner.nextLine();
        }

        while (!products.isEmpty()) {
            seconds++;
            String current = products.poll();
            String freeRobot = null;
            for (Map.Entry<String, Integer> robot : busyUntil.entrySet()) {
                if (robot.getValue() <= seconds) {
                    freeRobot = robot.getKey();
                    break;
                }
            }
            if (freeRobot == null) {
                products.offer(current);
                continue;
            }
            busyUntil.put(freeRobot, seconds + processingTimes.get(freeRobot));
            int clock = seconds % (24 * 3600);
            System.out.printf("%s - %s [%02d:%02d:%02d]%n", freeRobot, current, clock / 3600, clock / 60 % 60, clock % 60);
        }
    }
}
