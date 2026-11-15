-- database: geography
SELECT c.`country_code`, count(m.`mountain_range`) AS `mountain_range`
FROM `countries` AS `c`
         JOIN `mountains_countries` `mc` ON `c`.`country_code` = `mc`.`country_code`
         JOIN `mountains` `m` ON `mc`.`mountain_id` = `m`.`id`
WHERE c.`country_code` IN ('BG', 'US', 'RU')
GROUP BY c.`country_code`
ORDER BY `mountain_range` DESC;
