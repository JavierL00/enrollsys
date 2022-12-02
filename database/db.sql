drop table enrollment;

drop table student;

drop table user;

drop table role;

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    dni INTEGER,
    name VARCHAR(100),
    surname VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    role_id INTEGER,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE student (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    dni INTEGER,
    name VARCHAR(100),
    surname VARCHAR(100),
    age INTEGER,
    address VARCHAR(100),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollment (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    student_id INTEGER,
    user_id INTEGER,
    is_paid BOOLEAN DEFAULT 0,
    adds INTEGER,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);