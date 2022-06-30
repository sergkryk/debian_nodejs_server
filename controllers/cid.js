const Model = require('../models/cid');
// const cids = require('../config/cids');

module.exports = class {
  constructor() {

  }
  static async getById(req, res) {
    try {
      const id = req.auth.uid;
      const cid = await Model.fetchById(id);
      res.status(200).json(cid);  
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getAll(req, res) {
    try {
      const cids = await Model.fetchAll();
      res.status(200).json(cids);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async reset(req, res) {
    try {
      const ip = req.ip;
      const id = req.auth.uid;
      await Model.reset(id, ip);
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async getAddresses(req, res) {
    try {
      const [ address ] = await Model.getAddresses();
      res.status(200).json(address);
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
}

// const myPromise = new Promise((resolve, reject) => {
//   resolve(Model.getAddresses())
// })

// const result = [...cids];

// result.forEach((cid, index) => {
//   const myPromise = new Promise((resolve, reject) => {
//     resolve(Model.getAddresses(cid.cid));
//   })
//   myPromise.then((response) => {
//     if (response && response[0]) {
//       const address = response[0];
//       result[index].address = `${address.address_street} ${address.address_build}`;
//     } else {
//       result[index].address = cid.cid;
//     }
//   })
// })

// setTimeout(() => {
//   console.log(result.sort((a, b) => {
//     if (a.address > b.address) {
//       return 1;
//     }
//     if (a.address < b.address) {
//       return -1;
//     }
//     return 0;
//   }));
// }, 500)
