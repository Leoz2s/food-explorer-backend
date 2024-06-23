const knex = require("../database/knex");

class UsersValidatedRepository {
  async checkUser({user}) {
    const checkIfUserExists = await knex("users").where({id: user.id});
    return checkIfUserExists;
  };
};

module.exports = UsersValidatedRepository;