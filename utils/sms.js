const SMSru = require("sms_ru");
const renderPhoneNumber = require("../utils/renderPhoneNumber");

const sms = new SMSru(process.env.SMS_API_ID);

function multi(numbers, message) {
  sms.sms_send(
    {
      to: numbers.toString(),
      text: message,
      test: true,
    },
    function (e) {
      // console.log(e);
    }
  );
}

function single(options) {
  const { number, message, isTest = true } = options;
  const phone = renderPhoneNumber(number);
  if (phone) {
    sms.sms_send(
      {
        to: phone,
        text: message,
        test: isTest,
      },
      function (e) {
        // console.log(e);
      }
    );
  }
}

module.exports = { single, multi };
