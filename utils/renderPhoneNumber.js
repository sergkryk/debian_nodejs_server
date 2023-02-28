function renderPhoneNumber(number) {
  const COUNTRY_CODE = '7959';
  const rendered = number.slice(number.length - 7);
  return `${COUNTRY_CODE}${rendered}`;
}

module.exports = renderPhoneNumber;