INSERT INTO payments (
      date,
      sum,
      dsc,
      ip,
      last_deposit,
      uid,
      aid,
      method,
      ext_id,
      bill_id,
      inner_describe,
      currency,amount
      )
     VALUES (
      NOW(),
      '10',
      ,
      INET_ATON('127.0.0.1'),
      (SELECT deposit FROM bills WHERE uid = '254'),
      254,
      5,
      0,
      '',
      (SELECT id FROM bills WHERE uid = '254'),
      '',
      0,
      '10'
    )