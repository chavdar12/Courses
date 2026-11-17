# 11 · MySQL: delivery providers

Manage towns and the delivery companies in them. All pages share a header, footer and stylesheet.

```
db/config.php    connection settings; creates the deliveryinfo database if it is missing
db/create.php    creates the companyinfo and towns tables
db/backup.php    dumps every table to deliveryinfo_backup_<date>.sql
edits/           add towns, add providers, delete providers
includes/        shared header and footer
css/styles.css
```

## Setup

```bash
php -S localhost:8000 -t 11-mysql-delivery
```

1. Open <http://localhost:8000/db/create.php> once to create the tables.
2. Open <http://localhost:8000>, add a town, then add a provider.

Backup files are git-ignored.
