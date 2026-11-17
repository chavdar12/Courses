# TU-Varna PHP

PHP exercises from the **Web Applications** course at the Technical University of Varna, organized by topic. Every folder is a self-contained project with its own README and no dependency on any other folder.

## Projects

| # | Project | Topics |
|---|---------|--------|
| 01 | [Basics](01-basics) | Variables, arithmetic operators, `var_dump`, simple forms |
| 02 | [Conditionals and loops](02-conditionals-and-loops) | `if` / `switch`, `for`, dates, checkboxes |
| 03 | [Loops and functions](03-loops-and-functions) | `while`, `do…while`, nested loops, user functions |
| 04 | [Arrays](04-arrays) | Indexed and associative arrays, sorting, constants |
| 05 | [Strings](05-strings) | `strlen`, `strpos`, `explode`, `str_ireplace`, `strcasecmp` |
| 06 | [Files and uploads](06-files-and-uploads) | `fopen` / `fwrite`, `file_get_contents`, file uploads |
| 08 | [Object-oriented PHP](08-oop) | Classes, constructors, inheritance, objects from forms |
| 09 | [Static members and cookies](09-static-and-cookies) | `static` properties, `setcookie` |
| 10 | [MySQL: books](10-mysql-books) | CRUD with `mysqli` and prepared statements |
| 11 | [MySQL: delivery providers](11-mysql-delivery) | Multi-page app with shared layout, database backup |
| 12 | [MySQL: guestbook](12-mysql-guestbook) | Guestbook with timestamps |

## Requirements

- PHP 8.0 or newer
- MySQL or MariaDB for projects 10–12, for example from [XAMPP](https://www.apachefriends.org/)

## Running a project

Use PHP's built-in server, pointed at the project folder:

```bash
php -S localhost:8000 -t 04-arrays
```

Then open <http://localhost:8000/001.php>. On XAMPP, copy the folder into `htdocs/` instead.

The database projects connect as `root` with an empty password on `localhost`, which is the XAMPP default. To use different credentials, edit `db/config.php` in that project.

## Code style

The code follows [PSR-12](https://www.php-fig.org/psr/psr-12/). Editor settings are in [`.editorconfig`](.editorconfig) and formatter rules in [`.php-cs-fixer.dist.php`](.php-cs-fixer.dist.php). To format the code:

```bash
php-cs-fixer fix
```

## License

[MIT](LICENSE)
