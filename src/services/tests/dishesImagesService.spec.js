const DishesImagesRepositoryInMemory = require("../../repositories/repositoriesInMemory/DishesImagesRepositoryInMemory");
const DishesImagesService = require("../DishesImagesService");
const AppError = require("../../utils/AppError");

describe("DishImages tests", () => {
  let dishesImagesRepositoryInMemory;
  let dishesImagesService;
  beforeEach(() => {
    dishesImagesRepositoryInMemory = new DishesImagesRepositoryInMemory;
    dishesImagesService = new DishesImagesService(dishesImagesRepositoryInMemory);
  });

  it("Bad request: Attempt to upload image of a nonexistent dish.", async () => {
    await expect( dishesImagesService.update({}) ).rejects.toEqual(new AppError("O prato não existe.", 400));
  });
  
  it("Success to upload image.", async () => {
    const dish = await dishesImagesService.update({user_id: 1, id: 1, imageFile: "imageFile"});
    expect(dish).toHaveProperty("id");
  });
});