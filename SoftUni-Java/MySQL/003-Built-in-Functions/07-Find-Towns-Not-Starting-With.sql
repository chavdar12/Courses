-- database: soft_uni
SELECT `town_id`, `name`
FROM `towns`
WHERE lower(left (`name`, 1)) IN ('r', 'b', 'd') is FALSE
ORDER BY `name`;
