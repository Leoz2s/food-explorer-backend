const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const {name, email, password, role} = request.body;

    if(!name) {
      throw new AppError("Nome é obrigatório para se cadastrar!");
    }else if(!email) {
      throw new AppError("E-mail é obrigatório para se cadastrar!");
    }else if(!password) {
      throw new AppError("Senha é obrigatório para se cadastrar!");
    };

    const checkUserExists = await knex("users").where({email});

    if(checkUserExists[0]) {
      throw new AppError("Este e-mail já está em uso.");
    };

    const hashedPassword = await hash(password, 8);
    await knex("users").insert({name, email, password: hashedPassword, role});

    response.status(201).json();
  };
};

module.exports = UsersController;