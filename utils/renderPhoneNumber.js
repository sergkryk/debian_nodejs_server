function renderPhoneNumber(number) {
  const numToString = number.toString();
  if (numToString.match(/^72\d{7}$/)) {
    const COUNTRY_CODE = '7959';
    const rendered = numToString.slice(numToString.length - 7);
    return `${COUNTRY_CODE}${rendered}`;
  }
  return ''
}

module.exports = renderPhoneNumber;