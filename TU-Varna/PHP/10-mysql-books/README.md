# 10 · MySQL: books

A small book catalogue built on `mysqli` with prepared statements.

```
db/config.php    connection settings (getDbConnection)
db/books.php     getBooks, addBook, updatePublisher, deleteBooksByPublisher
db/schema.sql    creates the infobooks database and the book table
app/             one page per operation
```

## Setup

```bash
mysql -u root < 10-mysql-books/db/schema.sql
php -S localhost:8000 -t 10-mysql-books
```

Then open <http://localhost:8000>.
