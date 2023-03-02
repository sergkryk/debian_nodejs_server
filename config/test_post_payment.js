const axios = require("axios");

function main() {
  const now = new Date();
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

module.exports = main;
