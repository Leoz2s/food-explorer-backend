const UsersValidatedRepositoryInMemory = require("../../repositories/repositoriesInMemory/UsersValidatedRepositoryInMemory");
const UsersValidatedService = require("../UsersValidatedService");
const AppError = require("../../utils/AppError");

describe("", () => {
  let usersValidatedRepositoryInMemory;
  let usersValidatedService;
  beforeEach(() => {
    usersValidatedRepositoryInMemory = new UsersValidatedRepositoryInMemory;
    usersValidatedService = new UsersValidatedService(usersValidatedRepositoryInMemory);
  });

  it("Bad request: Unauthenticated user.", async () => {
    await expect(usersValidatedService.index({})).rejects.toEqual(new AppError("Não autorizado", 401));
  });
  it("Success to validate authenticated user.", async () => {
    const user = {id: 1};
    await expect(usersValidatedService.index({user})).resolves.toBe();
  });
});