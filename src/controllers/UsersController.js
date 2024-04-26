const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
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

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    };

    const hashedPassword = await hash(password, 8);
    await database.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, role]);

    response.status(201).json();
  };
};

module.exports = UsersController;