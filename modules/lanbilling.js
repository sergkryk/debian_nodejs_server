const { parseString } = require("xml2js");

const {
  getAuthBody,
  getAccounts,
  getAgreements,
  getPaymentBody,
} = require("../utils/soap");

class Lanbilling {
  constructor(url, manager, authCookie) {
    this.authCookie = authCookie;
    this.manager = manager;
    this.url = url;
    this.body = "";
  }

  getPostOptions() {
    return {
      method: "POST",
      headers: {
        "Content-type": "text/xml; charset=UTF-8",
        cookie: this.authCookie,
      },
      body: this.body,
    };
  }

  static async initialize(url, manager) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "text/xml; charset=UTF-8",
      },
      body: getAuthBody(manager.login, manager.pass),
    };
    const response = await fetch(url, options);
    console.log(response.headers);
    if (response.status === 200) {
      console.log(response.get('set-cookie'));
      const cookie = response.headers.get('set-cookie');
      // const cookie = response.headers.getSetCookie();
      return new Lanbilling(url, manager, cookie[0]);
    } else {
      throw new Error("Initialization failed!");
    }
  }

  async getAccounts(accountLogin) {
    try {
      this.body = getAccounts(accountLogin);
      const response = await fetch(this.url, this.getPostOptions());
      if (response.ok) {
        const data = await response.text();
        if (data.includes("uid")) {
          const matches = data.match(/<uid>\d+<\/uid>/g);
          const result = matches.toString().match(/\d+/g);
          return result;
        } else {
          return [];
        }
      }
    } catch (error) {
      return error;
    }
  }

  async getAgreements(userid) {
    try {
      this.body = getAgreements(userid);
      const response = await fetch(this.url, this.getPostOptions());
      if (response.ok) {
        const data = await response.text();
        if (data.includes("agrmid")) {
          const account = {};
          const matches = data.match(/<\w+>[^<|>]+<\/\w+>/gi);
          matches.map((el) =>
            parseString(el, (err, result) => {
              Object.assign(account, result);
            })
          );
          return account;
        } else {
          return [];
        }
      }
    } catch (error) {
      return error;
    }
  }

  async pay(agrid, amount, pid, aid, comment = "") {
    try {
      this.body = getPaymentBody(agrid, amount, pid, aid, comment);
      const response = await fetch(this.url, this.getPostOptions());
      if (response.ok) {
        const data = await response.text();
        return data;
      } else {
        return response;
      }
    } catch (error) {
      return error;
    }
  }
}

async function payToLanbilling(account, amount, pid, aid, comment) {
  const Lanbill = await Lanbilling.initialize("http://10.45.0.50:34012", {
    login: "admin",
    pass: "vv1315vv",
  });
  console.log(Lanbill);
  const [ uid ] = await Lanbill.getAccounts(account);
  const { agrmid } = await Lanbill.getAgreements(uid);
  const response = await Lanbill.pay(agrmid, amount, pid, aid, comment);
}

module.exports = { Lanbilling, payToLanbilling };
