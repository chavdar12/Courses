-- database: soft_uni
SELECT concat_ws(' ', `first_name`, `middle_name`, `last_name`) as `Full Name`
FROM soft_uni.`employees`
WHERE `salary` = 25000
   or `salary` = 14000
   or `salary` = 12500
   or `salary` = 23600;
