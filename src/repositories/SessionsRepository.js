const knex = require("../database/knex");

class SessionsRepository {
  async fetchUser({email}) {
    return await knex("users").where({email}).first();
  };
};

module.exports = SessionsRepository;