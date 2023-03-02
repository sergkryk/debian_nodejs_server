const axios = require("axios");

function tempPostPaymentProscessing() {
  const now = new Date();

  // в массиве должны лежать обьекты в формате {acc: 'login', sum: '10.00'} login - четыре цифры из логина пользователя
  const payments = [];

  payments.forEach((el, index) => {
    axios
      .get(
        `http://127.0.0.1:3000/dealer?QueryType=pay&TransactionId=${now}${index}&TransactionDate=20230219130000&Account=${el.acc}&Amount=${el.sum}`
      )
      .then(function (response) {
        // handle success
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
        // console.log('done');
      });
  });
}

module.exports = tempPostPaymentProscessing;
