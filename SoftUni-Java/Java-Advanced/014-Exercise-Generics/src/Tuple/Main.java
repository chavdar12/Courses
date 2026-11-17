package Tuple;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // the address is everything after the first and last name, so it may contain spaces
        String[] person = scanner.nextLine().split("\\s+", 3);
        String[] beer = scanner.nextLine().split("\\s+");
        String[] numbers = scanner.nextLine().split("\\s+");

        System.out.println(new Tuple<>(person[0] + " " + person[1], person[2]));
        System.out.println(new Tuple<>(beer[0], Integer.parseInt(beer[1])));
        System.out.println(
                new Tuple<>(Integer.parseInt(numbers[0]), Double.parseDouble(numbers[1])));
    }
}
