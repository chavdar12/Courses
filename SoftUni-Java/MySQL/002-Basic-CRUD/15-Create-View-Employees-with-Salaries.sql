-- database: soft_uni
CREATE VIEW `v_employees_salaries` as
SELECT `first_name`, `last_name`, `salary`
FROM soft_uni.`employees`;
