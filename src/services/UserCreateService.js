const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  };

  async execute(name, email, password, role) {
    if(!name) {
      throw new AppError("Nome é obrigatório para se cadastrar!");
    }else if(!email) {
      throw new AppError("E-mail é obrigatório para se cadastrar!");
    }else if(!password) {
      throw new AppError("Senha é obrigatório para se cadastrar!");
    };

    const checkUserExists = await this.userRepository.findUserByEmail(email);

    if(checkUserExists[0]) {
      throw new AppError("Este e-mail já está em uso.");
    };

    const hashedPassword = await hash(password, 8);
    const userCreated = await this.userRepository.createUser(name, email, hashedPassword, role);

    return userCreated;
  };
};

module.exports = UserCreateService;