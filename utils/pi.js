const { streets } = require("../config/streets");

const generateUserAddress = (pi) => {
  const {
    address_street: street,
    address_flat: flat,
    address_build: build,
  } = pi;
  const fullStreet = `${streets[street].type} ${street}`;
  return `${fullStreet}${build ? ", дом " + build : ""}${
    flat ? "/" + flat : ""
  }`;
};

const formatPhoneNumber = (num) => {
  const phone = num.toString();
  let body = '';
  let index = '';

  for (let i = phone.length - 1; i >=0; i--) {
    if (body.length < 7) {
      body = phone[i] + body;
    } else if (index.length < 2) {
      index = phone[i] + index;
    }
  }
  return `+38(0${index})${body}`
};

module.exports = { generateUserAddress, formatPhoneNumber };
