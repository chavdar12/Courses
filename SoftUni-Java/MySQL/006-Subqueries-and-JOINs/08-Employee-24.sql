-- database: soft_uni
SELECT
    e.`employee_id`,
    e.`first_name`,
    (
        CASE
            WHEN year(p.`start_date`) >= 2005 THEN NULL
            ELSE p.`name`
        END
    ) AS `project_name`
FROM `employees` AS `e`
LEFT JOIN `employees_projects` `ep` ON `e`.`employee_id` = `ep`.`employee_id`
JOIN `projects` `p` ON `ep`.`project_id` = `p`.`project_id`
WHERE e.`employee_id` = 24
ORDER BY `project_name`;
