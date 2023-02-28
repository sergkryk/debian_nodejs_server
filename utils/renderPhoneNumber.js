function renderPhoneNumber(number) {
  const numToString = number.toString();
  const COUNTRY_CODE = '7959';
  const rendered = numToString.slice(numToString.length - 7);
  return `${COUNTRY_CODE}${rendered}`;
}

module.exports = renderPhoneNumber;