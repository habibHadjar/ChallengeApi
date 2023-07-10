/*
Script de création de la base de données de test.
*/
create database IF NOT EXISTS challenges;

/* Créer l'utilisateur API */
create user IF NOT EXISTS 'user-api'@'%.%.%.%' identified by 'user-api-password';
grant select, update, insert, delete on challenges.* to 'user-api'@'%.%.%.%';
flush privileges;
