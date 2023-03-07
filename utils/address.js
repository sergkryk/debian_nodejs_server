function firstLetterToUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCity(str) {
  if (firstLetterToUpperCase(str) === "Малоивановка") {
    return `с.${String.fromCharCode(160)}${firstLetterToUpperCase(str)}`;
  } else {
    return `пгт.${String.fromCharCode(160)}${firstLetterToUpperCase(str)}`;
  }
}

function getStreet(str) {
  if (
    firstLetterToUpperCase(str) === "Солнечный" ||
    firstLetterToUpperCase(str) === "Молодёжный"
  ) {
    return `квартал${String.fromCharCode(160)}${firstLetterToUpperCase(str)}`;
  }
  if (str.includes("(")) {
    return `переулок${String.fromCharCode(160)}${str.split(" ")[0]}`;
  } else {
    return `улица${String.fromCharCode(160)}${str}`;
  }
}

function getBuild(build, flat = "") {
  if (flat) {
    return `дом${String.fromCharCode(160)}${build}${String.fromCharCode(160)}квартира ${flat}`;
  } else {
    return `дом${String.fromCharCode(160)}${build}`;
  }
}

module.exports = { getCity, getStreet, getBuild };
