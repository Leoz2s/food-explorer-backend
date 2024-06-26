const AppError = require("../utils/AppError");

class UsersValidatedService {
  constructor(usersValidatedRepository) {
    this.usersValidatedRepository = usersValidatedRepository;
  };

  async index({user}) {
    const checkIfUserExists = await this.usersValidatedRepository.checkUser({user});
    if(!checkIfUserExists) {
      throw new AppError("Não autorizado", 401);
    };

    return;
  };
};

module.exports = UsersValidatedService;