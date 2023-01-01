use shangrila_db;


-- USER ROLES
create table roles(
	id int primary key auto_increment,
	name varchar(255) not null
);

insert into roles (name) values ('admin'), ('user');


-- PROPERTY TYPES
create table propertyTypes(
	id int primary key auto_increment,
	name varchar(255) not null
);

insert into propertyTypes (name) values 
	('detached'),
	('semi_detached'),
	('terraced'),
	('flat'),
	('cottage'),
	('bungalow'),
	('mansion');


-- USERS 
create table users (
	id int primary key auto_increment,
	email Varchar(255) not null unique,
	address varchar(255),
	bedrooms int,
	propertyType int,
	role int not null,
	credit float default 0,
	password varchar(255) not null,
	foreign key (role) references roles(id) on delete  restrict,
	foreign key (propertyType) references propertyTypes(id) on delete  restrict
);


insert into users (email, password, role) values ('gse@shangrila.gov.un', 'fQO9xnP+dT2V704f5wzsPXlOJic6dfD5MALpqz9u5ew=', 1);

insert into users (email, address, bedrooms, propertyType, role, password) 
	values ('test@gmail.com', 'leicester 234', 9, 3, 2, 'WZRHGrsBESr8wYFZ9sx0tPURuZgG2lmzyvWpwXPKz8U=');


-- VOUCHERS
create table vouchers (
	id int primary key auto_increment,
	code varchar(255) not null unique,
	userId int,
	credit float not NULL,
	FOREIGN KEY (userId) REFERENCES users(id)
);


insert into vouchers (code, credit)
values
	('XTX2GZAD' ,200),
	('NDA7SY2V' ,200),
	('RVA7DZ2D' ,200),
	('DM8LEESR' ,200);




-- METER READINGS
create table readings(
	id int primary key auto_increment,
	userId int not null,
	date date,
	gas int not null,
	electricityDay int not null,
	electricityNight int not null,
	paid bit not null default 0,
	foreign key (userId) references users(id)
);
