-- database: soft_uni
SELECT e.`employee_id`, e.`first_name`, p.`name` as `project_name`
FROM `employees` AS `e`
         JOIN `employees_projects` `ep` ON ep.`employee_id` = `e`.`employee_id`
         JOIN `projects` `p` ON `ep`.`project_id` = `p`.`project_id`
WHERE date (p.`start_date`) > '2002-08-13' AND p.`end_date` IS NULL
ORDER BY e.`first_name`, p.`name`
    LIMIT 5;
