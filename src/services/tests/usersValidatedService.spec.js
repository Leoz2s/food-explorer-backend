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

  it("", async () => {
    
  });
});