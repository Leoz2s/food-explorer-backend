const DishesRepositoryInMemory = require("../../repositories/repositoriesInMemory/DishesRepositoryInMemory");
const DishesService = require("../DishesService");
const AppError = require("../../utils/AppError");

describe("DishesService tests", () => {
  let dishesRepositoryInMemory;
  let dishesService;
  beforeEach(() => {
    dishesRepositoryInMemory = new DishesRepositoryInMemory;
    dishesService = new DishesService(dishesRepositoryInMemory);
  });

  it("", async () => {
    
  });
});