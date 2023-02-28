const axios = require("axios");

function main() {
  const payments = [
    { acc: "1541", sum: "550.00" },
    { acc: "1826", sum: "550.00" },
    { acc: "1422", sum: "400.00" },
    { acc: "1180", sum: "400.00" },
    { acc: "1784", sum: "400.00" },
    { acc: "1344", sum: "600.00" },
    { acc: "1756", sum: "600.00" },
    { acc: "1899", sum: "400.00" },
    { acc: "1769", sum: "550.00" },
    { acc: "1065", sum: "400.00" },
    { acc: "2467", sum: "400.00" },
    { acc: "2239", sum: "400.00" },
    { acc: "2059", sum: "550.00" },
    { acc: "2220", sum: "400.00" },
    { acc: "2410", sum: "400.00" },
    { acc: "2209", sum: "400.00" },
    { acc: "2397", sum: "550.00" },
    { acc: "3255", sum: "400.00" },
    { acc: "3215", sum: "350.00" },
    { acc: "3645", sum: "500.00" },
    { acc: "3603", sum: "400.00" },
    { acc: "3196", sum: "400.00" },
    { acc: "3279", sum: "400.00" },
    { acc: "3332", sum: "400.00" },
    { acc: "3381", sum: "400.00" },
    { acc: "3640", sum: "500.00" },
    { acc: "3423", sum: "100.00" },
    { acc: "3501", sum: "500.00" },
    { acc: "3096", sum: "550.00" },
    { acc: "3119", sum: "550.00" },
    { acc: "3018", sum: "500.00" },
    { acc: "3210", sum: "400.00" },
    { acc: "3554", sum: "700.00" },
    { acc: "3027", sum: "1500.00" },
    { acc: "3436", sum: "350.00" },
    { acc: "3627", sum: "500.00" },
    { acc: "3481", sum: "400.00" },
    { acc: "3623", sum: "400.00" },
    { acc: "3130", sum: "400.00" },
    { acc: "3132", sum: "500.00" },
    { acc: "3592", sum: "650.00" },
    { acc: "3462", sum: "265.00" },
    { acc: "3560", sum: "500.00" },
    { acc: "3533", sum: "350.00" },
    { acc: "3520", sum: "520.00" },
    { acc: "1308", sum: "500.00" },
    { acc: "1736", sum: "400.00" },
    { acc: "1483", sum: "400.00" },
    { acc: "10104", sum: "400.00" },
    { acc: "1275", sum: "400.00" },
    { acc: "1812", sum: "550.00" },
    { acc: "1729", sum: "500.00" },
    { acc: "1391", sum: "500.00" },
    { acc: "1696", sum: "400.00" },
    { acc: "1119", sum: "550.00" },
    { acc: "1288", sum: "400.00" },
    { acc: "1715", sum: "400.00" },
    { acc: "1722", sum: "800.00" },
    { acc: "1448", sum: "550.00" },
    { acc: "1015", sum: "800.00" },
    { acc: "1497", sum: "500.00" },
    { acc: "2104", sum: "500.00" },
    { acc: "2192", sum: "400.00" },
    { acc: "2100", sum: "400.00" },
    { acc: "3526", sum: "550.00" },
    { acc: "3131", sum: "400.00" },
    { acc: "3239", sum: "550.00" },
    { acc: "3006", sum: "500.00" },
    { acc: "3634", sum: "500.00" },
    { acc: "3041", sum: "500.00" },
    { acc: "3339", sum: "550.00" },
    { acc: "3264", sum: "350.00" },
    { acc: "3403", sum: "450.00" },
    { acc: "3476", sum: "450.00" },
    { acc: "3527", sum: "400.00" },
    { acc: "3448", sum: "400.00" },
    { acc: "3086", sum: "550.00" },
    { acc: "3311", sum: "700.00" },
    { acc: "3226", sum: "350.00" },
    { acc: "3379", sum: "500.00" },
    { acc: "3040", sum: "550.00" },
    { acc: "1047", sum: "550.00" },
    { acc: "1166", sum: "500.00" },
    { acc: "1614", sum: "400.00" },
    { acc: "1139", sum: "400.00" },
    { acc: "1796", sum: "550.00" },
    { acc: "1255", sum: "500.00" },
    { acc: "1082", sum: "300.00" },
    { acc: "1160", sum: "400.00" },
    { acc: "1896", sum: "400.00" },
    { acc: "1226", sum: "300.00" },
    { acc: "1370", sum: "550.00" },
  ];

  // payments.forEach((el, index) => {
  //   axios
  //     .get(
  //       `http://127.0.0.1:3000/dealer?QueryType=pay&TransactionId=${index}&TransactionDate=20230219130000&Account=${el.acc}&Amount=${el.sum}`
  //     )
  //     .then(function (response) {
  //       // handle success
  //       // console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       // console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //       // console.log('done');
  //     });
  // });
}

module.exports = main;
