# 12 · MySQL: guestbook

Visitors leave a name, email and comment. Entries are listed newest first.

```
db/config.php            connection settings; creates the guest database if it is missing
db/create.php            creates the guestbook table
app/addGuestBook.php     sign the guestbook
app/viewGuestBook.php    read the entries
```

## Setup

```bash
php -S localhost:8000 -t 12-mysql-guestbook
```

1. Open <http://localhost:8000/db/create.php> once to create the table.
2. Open <http://localhost:8000>.
