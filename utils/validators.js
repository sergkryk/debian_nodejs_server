// вспомогательная функция для проверки телефона
function validatePhone(el) {
  const exp = /72\d{7}/;
  const result = `${el}`.match(exp);
  return result;
}

module.exports = { validatePhone };