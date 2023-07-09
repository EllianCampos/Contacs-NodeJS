--CREAR LA BSE DE DATOS
IF NOT EXISTS(SELECT * FROM master.dbo.SYSDATABASES WHERE NAME = 'DBContacts')
BEGIN
	create database DBContacts
END

-- SELECCIONAR LA BASE DE DATOS
use DBContacts

DROP TABLE IF EXISTS Users
create table Users(
	id_user int primary key identity(1,1),
	name_user varchar(100),
	password_user text
)

DROP TABLE IF EXISTS Contacts
create table Contacts(
	id_contact int primary key identity(1,1),
	name_contact varchar(100),
	phone_contact varchar(50),
	id_user int,

	foreign key (id_user) references Users(id_user)
)

select * from Contacts
select * from Users