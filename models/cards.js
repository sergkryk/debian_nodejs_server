const pool = require("../utils/db");
const { dbSecret } = require("../config/secret");

module.exports = class {
  static async check(card) {
    const { serial, pin } = card;
    const parsedNum = serial.slice(-11);
    const parsedSerial = serial.slice(0, serial.length - 11);
    const [response] = await pool.execute(
      `SELECT *, CONVERT(number, CHAR) as number, CONVERT(DECODE(pin, '${dbSecret}') USING utf8) as pin FROM cards_users WHERE number = '${parsedNum}' AND serial = '${parsedSerial}'`
    );
    if (!response) {
      throw new Error(
        "Не удалось получить ответ от сервера, повторите попытку позже"
      );
    }
    if (response.length === 0) {
      throw new Error(
        "Карты оплаты не существует, проверьте правильно ли вы ввели серийный номер"
      );
    }
    const [payCard] = response;
    if (payCard.status !== 0) {
      throw new Error("Карта с этим серийным номером уже использована");
    }
    if (parseInt(payCard.pin) !== parseInt(pin)) {
      console.log(typeof pin);
      console.log(typeof payCard.pin);
      throw new Error(
        "Проверьте введённые данные, комбинация пин-кода и серийного номера не найдена"
      );
    }
    return payCard;
  }
  static async use(uid, payCard, ip) {
    const today = new Date().getTime();
    // создаём запись об оплате в таблице payments //
    await pool.execute(
      `INSERT INTO payments (
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
        FROM_UNIXTIME(${today / 1000}),
        '${payCard.sum}',
        '${payCard.serial}${payCard.number}',
        INET_ATON('${ip}'),
        (SELECT deposit FROM bills WHERE uid = ${uid}),
        ${uid},
        3,
        2,
        '${payCard.serial}${payCard.number}',
        (SELECT id FROM bills WHERE uid = ${uid}),
        '',
        0,
        '${payCard.sum}'
      )`
    );
    // рагистрируем событие оплаты в истории в таблицу admin_adtions //
    await pool.execute(`INSERT INTO admin_actions (
      actions,
      datetime,
      ip,
      uid,
      aid,
      module,
      action_type
    )
    VALUES (
      'Пополнение картой ${payCard.serial}${payCard.number} id карты ${payCard.id}',
      FROM_UNIXTIME(${today / 1000}),
      INET_ATON('${ip}'),
      ${uid},
      3,
      'Cards',
      31
    );`)
    // обновляем статус и дату использования карты оплаты в таблице cards_users //
    await pool.execute(
      `UPDATE cards_users SET status = 2, datetime = FROM_UNIXTIME(${today / 1000}) WHERE id = ${payCard.id}`
    );

    // обновляем депозит в таблице bills у пользователя //
    await pool.execute(
      `UPDATE bills SET deposit = deposit + ${parseInt(payCard.sum)} where uid = ${uid}`
    );
  }
};