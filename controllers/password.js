const Model = require('../models/password');

async function checkPrevious(id, previous) {
  const [ current ] = await Model.fetchById(id, previous);
  if (current.password !== previous) {
    throw new Error('Check old password');
  }
}

function checkCandidate(candidate) {
  const regExp = new RegExp(/^\d{6}$/);
  if (!regExp.test(candidate)) {
    throw new Error('Check new password');
  }
}

function checkConfirmed(candidate, confirmed) {
  if (candidate !== confirmed) {
    throw new Error("The passwords are different");
  }
}

module.exports = class {
  static async getById(req, res) {
    try {
      const id = req.auth.uid;
      const password = await Model.fetchById(id);
      res.status(200).json(password);  
    } 
    catch (error) {
      console.log(error);
      res.status(404).send();
    }
  }
  static async update(req, res) {
    try {
      const { previous, candidate, confirmed } = req.body;
      const ip = req.ip;
      const id = req.auth.uid;
      await checkPrevious(id, previous);
      checkCandidate(candidate);
      checkConfirmed(candidate, confirmed);
      await Model.update(id, ip, candidate);
      res.status(200).json({message: 'Success'});
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: error.message,
      });
    }
  }
}
