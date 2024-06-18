const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const {name, email, password, role} = request.body;
    const userRepository = new UserRepository;

    const userCreateService = new UserCreateService(userRepository);
    const userCreated = await userCreateService.execute(name, email, password, role);

    response.status(201).json(`User ${userCreated} created.`);
  };
};

module.exports = UsersController;