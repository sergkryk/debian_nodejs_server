const TarifModel = require("../models/tarifs");
const BillsModel = require("../models/bills");
const PiModel = require("../models/pi");
const UserModel = require("../models/user");
const sms = require("../utils/sms");

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

// вспомогательная функция для генерации текста смс
function getSmsBody(date, account, sum) {
  return `Напоминаем, что ${date} на л/с ${account} спишется ${sum} руб. за интернет.`;
}

// вспомогательная функция для преобразования логина в лицевой счёт
function getAccount(login) {
  const exp = /\d{4}/;
  const match = login.match(exp);
  if (match) {
    return match[0];
  } else {
    return "";
  }
}

async function reminder(tp_id) {
  // получаю обьект с текущим тарифом т.к. мне нужна сумма платежа для сравнения с депозитом пользователя
  const { month_fee: monthFee } = await TarifModel.fetchById(tp_id);
  // получаю список уидов абонентов на этом тарифе
  const uidLists = await TarifModel.fetchUsersByTarif(tp_id);
  // запускаю цикл в котором обрабатываю полученные уиды абонентов
  for (let i = 0; i < uidLists.length; i++) {
    try {
      // создаю переменную с uid пользователя
      const uid = uidLists[i].uid;
      // получаю счёт пользователя с его депозитом
      const { deposit } = await BillsModel.fetchByUid(uid);
      // получаю аккаунт пользователя
      const { id: account } = await UserModel.fetchByUid(uid);
      // сравниваю депозит с нулём и ежемесячной оплатой чтобы отфильтровать отключенных и тех, кто уже оплатил
      if (deposit > 0 && deposit < monthFee) {
        // получаю номер телефона абонента
        const phone = await PiModel.fetchPhone(uid);
        // валидирую номер по маске
        const validated = validatePhone(phone[0].phone);
        // если номер валиден значит могу отправить абоненту смс с предупреждением
        if (validated && validated[0]) {
          sms.single({
            message: getSmsBody(getDate(), getAccount(account), monthFee),
            number: `7959${validated[0].slice(validated[0].length - 7)}`,
            // isTest: false,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

// функция для ежемесячной отправки смс
async function monthlyReminder() {
  // получаю список содержащий айди тарифных планов с ежемесячной оплатой
  // const tarifsIds = await TarifModel.fetchAllMonthly();

    // ОПОВЕЩЕНИЕ ОТПРАВЛЕНО 26.02.2023
  // const prostoy = await reminder(4);

  // ОПОВЕЩЕНИЕ ОТПРАВЛЕНО 26.02.2023
  // const optimal5 = await reminder(8);

  // ОПОВЕЩЕНИЕ ОТПРАВЛЕНО 26.02.2023
  // const optimal10 = await reminder(9);

  // ОПОВЕЩЕНИЕ ОТПРАВЛЕНО 26.02.2023
  // const optimal30 = await reminder(15);

  // ОПОВЕЩЕНИЕ ОТПРАВЛЕНО 26.02.2023
  // const optimal50 = await reminder(16);

  // ОПОВЕЩЕНИЕ ОТПРАВЛЕНО 26.02.2023
  // const optimal100 = await reminder(17);
}

module.exports = { monthlyReminder };
