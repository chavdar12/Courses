import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

// Usage: CreateZipArchive <files.zip> <file>...
public class CreateZipArchive {
    public static void main(String[] args) throws IOException {
        try (ZipOutputStream zip = new ZipOutputStream(new FileOutputStream(args[0]))) {
            for (int i = 1; i < args.length; i++) {
                Path file = Path.of(args[i]);
                zip.putNextEntry(new ZipEntry(file.getFileName().toString()));
                Files.copy(file, zip);
                zip.closeEntry();
            }
        }
    }
}
