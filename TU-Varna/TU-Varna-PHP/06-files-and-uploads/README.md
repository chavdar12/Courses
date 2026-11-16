# 06 · Files and uploads

| Path | What it does |
|------|--------------|
| `write-file/` | Writes `data.txt`, appends to it, then prints it with its size |
| `upload-file/` | Uploads `.txt`, `.png` or `.jpg` files (up to 20 MB) into `upload-file/upload/` |
| `data/array.txt` | Sample comma-separated numbers |

```bash
php -S localhost:8000 -t 06-files-and-uploads   # open /write-file/ or /upload-file/
```

The generated `data.txt` and the uploaded files are git-ignored.
