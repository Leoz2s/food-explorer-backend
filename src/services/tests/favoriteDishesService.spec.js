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

  // create
  it("Bad request: Attempt to favorite an already favorited dish.", async () => {
    await expect(favoriteDishesService.create({id: 1, user_id: 1})).rejects.toEqual(new AppError("O prato já está favoritado.", 400));
  });
  it("Success to favorite.", async () => {
    await expect(favoriteDishesService.create({id: null, user_id: 1})).resolves.toBe(1);
  });

  // show
  it("Success to show favorite. Result: True.", async () => {
    await expect(favoriteDishesService.show({id: 1, user_id: 1})).resolves.toBe(true);
  });
  it("Success to show favorite. Result: False.", async () => {
    await expect(favoriteDishesService.show({id: 2, user_id: 1})).resolves.toBe(false);
  });

  // delete
  it("Bad request: Attempt to favorite a not favorited dish.", async () => {
    await expect(favoriteDishesService.delete({id: 2, user_id: 1})).rejects.toEqual(new AppError("Este prato não está favoritado.", 400));
  });
  it("Success to delete favorite.", async () => {
    await expect(favoriteDishesService.delete({id: 1, user_id: 1})).resolves.toBe();
  });

  // index
  it("Success to show all user's favorite dishes.", async () => {
    await expect(favoriteDishesService.index({user_id: 1})).resolves.toEqual([{id: 1}, {id: 2}]);
  });
});