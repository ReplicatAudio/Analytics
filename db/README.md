sqlite3 database.sqlite
UPDATE Actions SET tag = REPLACE(tag, 'tracking_','ti_');


sqlite3 databaseFix.sqlite .dump > sqlite.sql && bash sqlite3-to-mysql.sh sqlite.sql > mysql.sql && rm sqlite.sql



CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Tru5tn01!';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON analytics.* TO 'admin'@'localhost';

ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Tru5tn01!';
FLUSH PRIVILEGES;