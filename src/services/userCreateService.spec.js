const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const UserCreateService = require("./UserCreateService");
const AppError = require("../utils/AppError");

describe("UserCreateService tests", () => {
  let userRepositoryInMemory;
  let userCreateService;
  let user;
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory;
    userCreateService = new UserCreateService(userRepositoryInMemory);

    user = {
      name: "Test user",
      email: "test@email.com",
      password: "123456",
      role: "customer",
    };
  });
  
  it("User created.", async () => {
    const userCreated = await userCreateService.execute(user);
    expect(userCreated).toBeDefined();
  });

  it("Bad request made with e-mail already registered to register new user.", async () => {
    await userCreateService.execute(user);
    await expect(userCreateService.execute(user)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
});