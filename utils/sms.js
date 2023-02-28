const SMSru = require("sms_ru");

const renderPhoneNumber = require("../utils/renderPhoneNumber");
const api_id = "B051ADE4-6EC3-EFAE-B746-734A696DBCF7";

const sms = new SMSru(api_id);

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
  const { number, message, isTest = true } = options
  sms.sms_send(
    {
      to: renderPhoneNumber(number),
      text: message,
      test: isTest,
    },
    function (e) {
      console.log(e);
    }
  );
}

module.exports = { single, multi };
