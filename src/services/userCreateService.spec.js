const UserCreateService = require("./UserCreateService");

it("User should be created.", async () => {
  const data = {
    name: "Test user",
    email: "test@email.com",
    password: "123456",
    role: "customer",
  };

  const userCreateService = new UserCreateService;
  const userCreated = await userCreateService.execute(data);
  console.log(userCreated)

  expect(userCreated).toHaveProperty("id");
});