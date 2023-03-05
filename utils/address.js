function firstLetterToUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCity(str) {
  if (firstLetterToUpperCase(str) === "Малоивановка") {
    return `с. ${firstLetterToUpperCase(str)}`;
  } else {
    return `пгт. ${firstLetterToUpperCase(str)}`;
  }
}

function getStreet(str) {
  if (
    firstLetterToUpperCase(str) === "Солнечный" ||
    firstLetterToUpperCase(str) === "Молодёжный"
  ) {
    return `квартал ${firstLetterToUpperCase(str)}`;
  }
  if (str.includes("(")) {
    return `переулок ${str.split(" ")[0]}`;
  } else {
    return `улица ${str}`;
  }
}

function getBuild(build, flat = "") {
  if (flat) {
    return `дом ${build}, квартира ${flat}`;
  } else {
    return `дом ${build}`;
  }
}

module.exports = { getCity, getStreet, getBuild };
