const sms = require("../utils/sms");

const TarifModel = require("../models/tarifs");
const BillsModel = require("../models/bills");
const PiModel = require("../models/pi");

// вспомогательная функция для проверки телефона
function validatePhone(el) {
  const exp = /72\d{7}/;
  const result = `${el}`.match(exp);
  return result;
}

// вспомогательная функция генерации даты с первым числом следующего месяца
function getDate() {
  // создаю обьект текущей даты
  const now = new Date;
  // устанавливаю следующий месяц и первое число и получаю миллисекунды
  const milliseconds = now.setMonth(now.getMonth() + 1, 1);
  // возвращаю сконвертированные миллисекунды с российской формате
  return new Date(milliseconds).toLocaleDateString('ru-RU');
}

// функция редьюсер для редьюса массива содержащего айди тарифных планов
async function reminder(acc, item) {
  // нужно всегда ресолвить аккумулятор в редьюсе т.к. редьюс асинхронный
  const resolvedAcc = await acc;
  // получаю обьект с текущим тарифом т.к. мне нужна сумма платежа для сравнения с депозитом пользователя
  const tarif = await TarifModel.fetchById(item.id);
  // получаю массив с вложенными массивами уидов абонентов по каждому ежемесячному тарифу
  const uidLists = await TarifModel.fetchUsersByTarif(item.id);
  // запускаю цикл внутри цикла (знаю это плохо) в котором обрабатываю полученные уиды абонентов
  for (let i = 0; i < uidLists.length; i++) {
    // получаю счёт пользователя с его депозитом
    const userBill = await BillsModel.fetchByUid(uidLists[i].uid);
    // сравниваю депозит с нулём и ежемесячной оплатой чтобы отфильтровать отключенных и тех, кто уже оплатил
    if (userBill[0].deposit > 0 && userBill[0].deposit < tarif[0].month_fee) {
      // получаю номер телефона абонента
      const phone = await PiModel.fetchPhone(userBill[0].uid);
      // валидирую номер на совпадение с маской
      const validated = validatePhone(phone[0].phone);
      // если номер валиден значит могу отправить абоненту смс с предупреждением, добавляю номер в список для дальнейшей отправки
      if (validated && validated[0]) {
        const number = validated[0];
        resolvedAcc.push(`7959${number.slice(number.length - 7)}`);
      }
    }
  }
  return resolvedAcc;
}

// функция для ежемесячной отправки смс
async function monthlyReminder() {
  // получаю список содержащий айди тарифных планов с ежемесячной оплатой
  const tarifsIds = await TarifModel.fetchAllMonthly();
  /* с помощью встроенной функции редьюс трансформирую список содержащий айди тарифных планов в список абонентов,
     провожу их проверку и отправляю смс при необходимости. см. getUsersLists
  */
  const numbers = await tarifsIds.reduce(reminder, Promise.resolve([]));
  const message = `Обратите внимание! ${getDate()} списание абонентской платы за интернет.`
  // использую библиотеку от sms.ru отправляю смс всем абонентам с предупреждением
  sms.sms_send(
    {
      to: numbers.slice(0,10).toString(),
      text: message,
      test: true,
    },
    function (e) {
      console.log(e);
    }
  );
}

module.exports = { monthlyReminder };
