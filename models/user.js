const pool = require('../utils/db');
const { basic } = require('../database/userQueries');

class User {
  constructor(id) {
    this.id = id;
  }
  async fetchUser() {
    const [[ user ]] = await pool.execute(basic, [this.id]);
    console.log(user);
    return user;
  }
}

module.exports = User;