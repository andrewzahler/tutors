USE tutors_db;

CREATE TABLE appointments (
  id INT AUTO_INCREMENT NOT NULL,
  subject varchar(255) NOT NULL,
  date date NOT NULL,
  time varchar(255) NOT NULL,
  hours varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  TutorId int(11) NOT NULL,
  StudentId int(11) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE students (
  id INT AUTO_INCREMENT NOT NULL,
  uType int(11) NOT NULL,
  name varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE tutors (
  id INT NOT NULL AUTO_INCREMENT,
  uType int(11) NOT NULL,
  name varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  subjects varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UserId int(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  password varchar(255) NOT NULL,
  email varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (`id`)
);

