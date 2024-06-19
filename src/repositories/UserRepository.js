const knex = require("../database/knex");

class UserRepository {
  async findUserByEmail({email}) {
    const checkUserExists = await knex("users").where({email});
    return checkUserExists;
  };

  async createUser({name, email, hashedPassword, role}) {
    const userCreated = await knex("users").insert({name, email, password: hashedPassword, role});
    return userCreated;
  };
};

module.exports = UserRepository;
