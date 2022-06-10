const Model = require('../models/password');
const Actions = require('../models/actions');

async function checkPrevious(id, previous) {
  const [ current ] = await Model.fetchById(id, previous);
  if (current.password !== previous) {
    throw new Error('Текущий пароль введён неверно');
  }
}

function checkCandidate(candidate) {
  const regExp = new RegExp(/^\d{6}$/);
  if (!regExp.test(candidate)) {
    throw new Error('В новом пароле должны быть только цифры');
  }
}

function checkConfirmed(candidate, confirmed) {
  if (candidate !== confirmed) {
    throw new Error("Ошибка подтверждения пароля");
  }
}

async function checkPasswordDate(id) {
  const PASS_CHANGE_INTERVAL = 1000000;
  const [ dbDate ] = await Actions.fetchPasswordChangeDate(id);
  if (!dbDate) {
    return;
  }
  const lastChange = new Date(dbDate.datetime);
  const now = new Date();
  const diff = now - lastChange;
  if (diff < PASS_CHANGE_INTERVAL) {
    throw new Error('Нельзя менять пароль так часто');
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
      await checkPasswordDate(id);
      await Model.update(id, ip, candidate);
      res.status(200).json({message: 'Данные успешно сохранены'});
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
      });
    }
  }
}
