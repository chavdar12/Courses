-- database: diablo
SELECT `name`, DATE_FORMAT(`start`, '%Y-%m-%d') as `asd`
FROM `games`
WHERE extract(YEAR FROM `start`) in ('2011', '2012')
ORDER BY `start`, `name` LIMIT 50;
