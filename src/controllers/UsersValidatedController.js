const UsersValidatedRepository = require("../repositories/UsersValidatedRepository");
const UsersValidatedService = require("../services/UsersValidatedService");

const usersValidatedRepository = new UsersValidatedRepository;
const usersValidatedService = new UsersValidatedService(usersValidatedRepository);

class UsersValidatedController {
  async index(request, response) {
    const {user} = request;

    await usersValidatedService.index({user});

    return response.status(200).json();
  };
};

module.exports = UsersValidatedController;