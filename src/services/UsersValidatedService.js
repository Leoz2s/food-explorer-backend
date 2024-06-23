const AppError = require("../utils/AppError");

class UsersValidatedService {
  constructor(usersValidatedRepository) {
    this.usersValidatedRepository = usersValidatedRepository;
  };

  async index({user}) {
    const checkUserExists = await this.usersValidatedRepository.checkUser({user});
    if(checkUserExists.length === 0) {
      throw new AppError("Não autorizado", 401);
    };

    return;
  };
};

module.exports = UsersValidatedService;