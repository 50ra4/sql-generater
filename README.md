# sql-generater

SELECT name from users where id = '';

SELECT * from users where id = '' orderby;

UPDATE projects SET url = 'https://github.com/~' WHERE id = 1;

INSERT INTO projects (id, name, url, created_at, updated_at) VALUES (0, '', 'https://github.com/~', now(), now());

DELETE FROM [テーブル名]　WHERE name IS NULL;