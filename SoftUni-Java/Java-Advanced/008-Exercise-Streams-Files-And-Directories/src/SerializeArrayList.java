import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

// Usage: SerializeArrayList <list.ser>
public class SerializeArrayList {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        ArrayList<Double> numbers = new ArrayList<>(List.of(1.5, 2.25, -3.0, 4.0));

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(args[0]))) {
            out.writeObject(numbers);
        }
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(args[0]))) {
            System.out.println(in.readObject());
        }
    }
}
