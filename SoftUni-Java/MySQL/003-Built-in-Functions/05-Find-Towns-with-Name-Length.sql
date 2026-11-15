-- database: soft_uni
SELECT `name`
FROM `towns`
WHERE char_length(`name`) in (5, 6)
ORDER BY `name`;
