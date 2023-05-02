USE employee_db;

INSERT INTO departments (name)
VALUES ('Engineering'),
('People Resources'),
('Consulting'),
('Sales'),
('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES ('Tech Lead', 175000, 1),
('HR Director', 180000, 2),
('Senior Consultant', 160000, 3),
('Junior Consultant', 100000, 3),
('Recruiter', 90000, 2),
('Account Manager', 100000, 4),
('Director of Marketing', 200000, 5),
('Graphic Designer', 95000, 5),
('Marketing Campaign Manager', 130000, 5),
('Junior Developer', 100000, 1),
('Senior Developer', 140000, 1),
('Director of Engineering', 250000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES('Aaron', 'Streate', 12, null),
('Steven', 'Corona', 1, 1),
('Yeiner', 'Agurre', 10, 2),
('Evan', 'Schindler', 10, 2),
('Audrey', 'Ganey', 2, null),
('Jacqueline', 'Taylor', 5, 5),
('Kevin', 'Kwan', 7, null),
('Andy', 'Cheung', 9, 7),
('John', 'Smith', 11, 2);
