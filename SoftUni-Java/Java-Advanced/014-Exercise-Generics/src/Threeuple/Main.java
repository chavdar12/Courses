package Threeuple;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String[] person = scanner.nextLine().split("\\s+");
        String[] beer = scanner.nextLine().split("\\s+");
        String[] bank = scanner.nextLine().split("\\s+");

        // the town is the last word, the address is everything between the names and the town
        String address = String.join(" ", Arrays.copyOfRange(person, 2, person.length - 1));

        System.out.println(new Threeuple<>(person[0] + " " + person[1], address, person[person.length - 1]));
        System.out.println(new Threeuple<>(beer[0], Integer.parseInt(beer[1]), beer[2].equals("drunk")));
        System.out.println(new Threeuple<>(bank[0], Double.parseDouble(bank[1]), bank[2]));
    }
}
