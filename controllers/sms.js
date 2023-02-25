const sms = require("../utils/sms");

const TarifModel = require("../models/tarifs");
const BillsModel = require("../models/bills");
const PiModel = require("../models/pi");

const chunkSize = 25;

// вспомогательная функция для проверки телефона
function validatePhone(el) {
  const exp = /72\d{7}/;
  const result = `${el}`.match(exp);
  return result;
}

// вспомогательная функция генерации даты с первым числом следующего месяца
function getDate() {
  // создаю обьект текущей даты
  const now = new Date();
  // устанавливаю следующий месяц и первое число и получаю миллисекунды
  const milliseconds = now.setMonth(now.getMonth() + 1, 1);
  // возвращаю сконвертированные миллисекунды с российской формате
  return new Date(milliseconds).toLocaleDateString("ru-RU");
}

// вспомогательная функция деления массива на чанки
function chunkArray(myArray, chunk_size) {
  const tempArray = [];

  for (let i = 0; i < myArray.length; i += chunk_size) {
    myChunk = myArray.slice(i, i + chunk_size);
    tempArray.push(myChunk);
  }
  return tempArray;
}

async function reminder(tp_ip) {
  const numbers = [];
  // получаю обьект с текущим тарифом т.к. мне нужна сумма платежа для сравнения с депозитом пользователя
  const tarif = await TarifModel.fetchById(tp_ip);
  // получаю массив с вложенными массивами уидов абонентов по каждому ежемесячному тарифу
  const uidLists = await TarifModel.fetchUsersByTarif(tp_ip);
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
        const number = `7959${validated[0].slice(validated[0].length - 7)}`;
        numbers.push(number);
      }
    }
  }
  return numbers;
}

// функция для ежемесячной отправки смс
async function monthlyReminder() {
  const message = `Обратите внимание! ${getDate()} списание абонентской платы за интернет.`;

  // получаю список содержащий айди тарифных планов с ежемесячной оплатой
  const tarifsIds = await TarifModel.fetchAllMonthly();

  for (let i = 0; i < tarifsIds.length; i++) {
    const numbers = await reminder(tarifsIds[i].id);
    const chunkedNumbers = chunkArray(numbers, chunkSize);

    // использую библиотеку от sms.ru отправляю смс всем абонентам с предупреждением
    for (let i = 0; i < chunkedNumbers.length; i++) {
    //   sms.sms_send(
    //     {
    //       to: chunkedNumbers[i].toString(),
    //       text: message,
    //       test: true,
    //     },
    //     function (e) {
    //       console.log(e);
    //     }
    //   );
    }
  }
}

module.exports = { monthlyReminder };
