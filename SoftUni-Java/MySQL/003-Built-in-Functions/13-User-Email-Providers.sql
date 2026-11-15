-- database: diablo
SELECT `user_name`, substring(`email`, locate('@', `email`) + 1) as `Email Provider`
FROM `users`
ORDER BY `Email Provider`, `user_name`;
