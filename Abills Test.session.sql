SELECT d.uid, u.address_street, u.address_build, u.address_flat FROM dv_main d
INNER JOIN users_pi u ON d.uid = u.uid
WHERE d.cid = '2c:ab:25:d6:2c:c2';