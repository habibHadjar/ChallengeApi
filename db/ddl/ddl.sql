/* La définition du schéma */
USE challenges;

-- Create Users table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);

DROP TRIGGER IF EXISTS before_insert_user;

CREATE TRIGGER before_insert_user
BEFORE INSERT
ON Users FOR EACH ROW SET new.email = LOWER(TRIM(new.email));

-- Create Admins table
CREATE TABLE IF NOT EXISTS Admins (
  user_id INT NOT NULL,
  password VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  CONSTRAINT PK_Admins PRIMARY KEY (user_id)
);

-- Create Students table
CREATE TABLE IF NOT EXISTS Students (
  user_id INT NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Users(id),
  CONSTRAINT PK_Students PRIMARY KEY (user_id),
  CONSTRAINT FK_Students_Users FOREIGN KEY (user_id) REFERENCES Users(id),
  CONSTRAINT CK_StudentsAdmins UNIQUE (user_id)
);

-- Create a procedure to check before insert in the students table if the user is not already an admin
DROP PROCEDURE IF EXISTS check_user_is_not_admin;
DELIMITER $$
CREATE PROCEDURE check_user_is_not_admin (IN new_user_id INT)
BEGIN
  DECLARE user_is_admin INT;
  SELECT COUNT(*) INTO user_is_admin FROM Admins WHERE user_id = new_user_id;
  IF user_is_admin > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is already an admin';
  END IF;
END $$
DELIMITER ;

-- Create a procedure to check before insert in the admins table if the user is not already a student
DROP PROCEDURE IF EXISTS check_user_is_not_student;
DELIMITER $$
CREATE PROCEDURE check_user_is_not_student (IN new_user_id INT)
BEGIN
  DECLARE user_is_student INT;
  SELECT COUNT(*) INTO user_is_student FROM Students WHERE user_id = new_user_id;
  IF user_is_student > 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is already a student';
  END IF;
END $$
DELIMITER ;

-- Create a trigger to check before insert in the students table if the user is not already an admin
DROP TRIGGER IF EXISTS before_insert_student;
DELIMITER $$
CREATE TRIGGER before_insert_student
BEFORE INSERT
ON Students FOR EACH ROW
BEGIN
  CALL check_user_is_not_admin(new.user_id);
END $$
DELIMITER ;

-- Create a trigger to check before update in the students table if the user is not already an admin
DROP TRIGGER IF EXISTS before_update_student;
DELIMITER $$
CREATE TRIGGER before_update_student
BEFORE UPDATE
ON Students FOR EACH ROW
BEGIN
  CALL check_user_is_not_admin(new.user_id);
END $$
DELIMITER ;

-- Create a trigger to check before insert in the admins table if the user is not already a student
DROP TRIGGER IF EXISTS before_insert_admin;
DELIMITER $$
CREATE TRIGGER before_insert_admin
BEFORE INSERT
ON Admins FOR EACH ROW
BEGIN
  CALL check_user_is_not_student(new.user_id);
END $$
DELIMITER ;

-- Create a trigger to check before update in the admins table if the user is not already a student
DROP TRIGGER IF EXISTS before_update_admin;
DELIMITER $$
CREATE TRIGGER before_update_admin
BEFORE UPDATE
ON Admins FOR EACH ROW
BEGIN
  CALL check_user_is_not_student(new.user_id);
END $$
DELIMITER ;

-- Create Groups table
CREATE TABLE IF NOT EXISTS Groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create Student_groups table
CREATE TABLE IF NOT EXISTS Student_groups (
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Students(user_id),
  FOREIGN KEY (group_id) REFERENCES Groups(id),
  CONSTRAINT PK_Student_groups PRIMARY KEY (user_id, group_id)
);

-- Create Challenges table
CREATE TABLE IF NOT EXISTS Challenges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create Questions table
CREATE TABLE IF NOT EXISTS Questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  failure_message VARCHAR(255),
  rank INT NOT NULL,
  challenge_id INT NOT NULL,
  FOREIGN KEY (challenge_id) REFERENCES Challenges(id),
  CONSTRAINT UK_Questions UNIQUE (challenge_id, rank)
);

-- Create Commands table
CREATE TABLE IF NOT EXISTS Commands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  command VARCHAR(255) NOT NULL,
  rank INT NOT NULL,
  question_id INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES Questions(id),
  CONSTRAINT UK_Commands UNIQUE (question_id, rank)
);

-- Create Solutions table
CREATE TABLE IF NOT EXISTS Solutions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stdout VARCHAR(255),
  stderr VARCHAR(255),
  command_id INT NOT NULL,
  FOREIGN KEY (command_id) REFERENCES Commands(id)
);

-- Create Student_Questions table
CREATE TABLE IF NOT EXISTS Student_Questions (
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  points INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Students(user_id),
  FOREIGN KEY (question_id) REFERENCES Questions(id),
  CONSTRAINT PK_Student_Questions PRIMARY KEY (user_id, question_id)
);

-- Create Group_Challenges table
CREATE TABLE IF NOT EXISTS Group_Challenges (
  group_id INT NOT NULL,
  challenge_id INT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES Groups(id),
  FOREIGN KEY (challenge_id) REFERENCES Challenges(id),
  CONSTRAINT PK_Group_Challenges PRIMARY KEY (group_id, challenge_id)
);

-- Create Student_Challenges table
CREATE TABLE IF NOT EXISTS Student_Challenges (
  user_id INT NOT NULL,
  challenge_id INT NOT NULL,
  shell_ip VARCHAR(255),
  shell_username VARCHAR(255),
  db_ip VARCHAR(255),
  db_port INT,
  db_user VARCHAR(255),
  db_password VARCHAR(255),
  db_table VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES Students(user_id),
  FOREIGN KEY (challenge_id) REFERENCES Challenges(id),
  CONSTRAINT PK_Student_Challenges PRIMARY KEY (user_id, challenge_id)
);
