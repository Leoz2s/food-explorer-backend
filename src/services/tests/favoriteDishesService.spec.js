const FavoriteDishesRepositoryInMemory = require("../../repositories/repositoriesInMemory/FavoriteDishesRepositoryInMemory");
const FavoriteDishesService = require("../FavoriteDishesService");
const AppError = require("../../utils/AppError");

describe("", () => {
  let favoriteDishesRepositoryInMemory;
  let favoriteDishesService;
  beforeEach(() => {
    favoriteDishesRepositoryInMemory = new FavoriteDishesRepositoryInMemory;
    favoriteDishesService = new FavoriteDishesService(favoriteDishesRepositoryInMemory);
  });

  it("", async () => {

  });
});