const SessionsRepository = require("../repositories/SessionsRepository");
const SessionsCreateService = require("../services/SessionCreateService");

class SessionsController {
  async create(request, response) {
    const {email, password} = request.body;
    
    const sessionsRepository = new SessionsRepository;
    const sessionCreateService = new SessionsCreateService(sessionsRepository);

    const [user, token] = await sessionCreateService.execute({email, password});

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    delete user.password;
    
    return response.status(201).json({user});
  };
};

module.exports = SessionsController;