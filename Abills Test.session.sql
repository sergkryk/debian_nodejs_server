SELECT id, date, sum, dsc, method FROM payments WHERE id = (SELECT max(id) as id FROM payments WHERE uid = 402)