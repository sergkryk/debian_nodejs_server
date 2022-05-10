const pool = require('../utils/db');
const { personal: personalQuery } = require('../database/userQueries');
const { streets } = require("../config/streets");

const generateUserAddress = (street, build, flat) => {
  return `${streets[street].type} ${street}${build ? ", дом " + build : ""}${
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

const renderPersonalInfo = (personal) => {
  const { fio, phone, email, city, street, build, flat } = personal;
    return [
      {
        label: 'ФИО',
        data: fio
      },
      {
        label: 'Телефон',
        data: formatPhoneNumber(phone)
      },
      {
        label: 'Электронная почта',
        data: email
      },
      {
        label: 'Населённый пункт',
        data: city
      },
      {
        label: 'Адрес',
        data: generateUserAddress(street, build, flat)
      },
    ]
}

class Personal {
  constructor(id) {
    this.id = id;
  }

  async fetchUserPersonal() {
    const [[ tpDetails ]] = await pool.execute(personalQuery, [this.id]);
    const result = renderPersonalInfo(tpDetails);
    return result;
  }
}

module.exports = Personal;