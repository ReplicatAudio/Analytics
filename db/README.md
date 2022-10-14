sqlite3 database.sqlite
UPDATE Actions SET tag = REPLACE(tag, 'tracking_','ti_');