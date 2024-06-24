const DishesRepositoryInMemory = require("../../repositories/repositoriesInMemory/DishesRepositoryInMemory");
const DishesService = require("../DishesService");
const AppError = require("../../utils/AppError");

describe("DishesService tests", () => {
  let dishesRepositoryInMemory;
  let dishesService;
  let dish;
  beforeEach(() => {
    dishesRepositoryInMemory = new DishesRepositoryInMemory;
    dishesService = new DishesService(dishesRepositoryInMemory);
    dish = {
      id: 1,
      image: null,
      user_id: 1,
      name: "Dish",
      category: "Refeição",
      price: "R$ 10,00",
      description: "This is a dish.",
      ingredients: ["Nutrients", "Vitamins"],
    };
  });

  // create
  it("Bad request: Attempt to create dish with already registered name.", async () => {
    await expect(dishesService.create(dish)).rejects.toEqual(new AppError("Já existe um prato com este nome. Troque o nome do prato para cadastrá-lo.", 400));
  });
  it("Success to create dish", async () => {
    dish.name = "Different dish name"
    const dish_id = await dishesService.create(dish);
    expect(dish_id).toBeDefined();
  });

  // show
  it("Bad request: Attempt to fetch nonexistent dish.", async () => {
    await expect(dishesService.show({id: null})).rejects.toEqual(new AppError("Prato não encontrado.", 400));
  });
  it("Success to fetch dish.", async () => {
    const [dishFetched, ingredients] = await dishesService.show({id: 1});
    expect(dishFetched).toHaveProperty("id");
  });

  // delete
  it("Bad request: Attempt to delete nonexistent dish.", async () => {
    await expect(dishesService.delete({id: null})).rejects.toEqual(new AppError("O prato a ser deletado não existe.", 400));
  });
  it("Success to delete dish", async () => {
    await expect(dishesService.delete({id: 1})).resolves.toBe();
  });

  // index
  it("Success to fetch dishes. Searching with the same string for name and ingredients.", async () => {
    const dishesWithIngredients = await dishesService.index({name: "a", ingredients: "a"})
    expect(dishesWithIngredients[0]).toHaveProperty("ingredients");
  });
  it("Success to fetch dishes. Searching with different string for name and ingredients.", async () => {
    const dishesWithIngredients = await dishesService.index({name: "a", ingredients: "b"})
    expect(dishesWithIngredients[0]).toHaveProperty("ingredients");
  });
  it("Success to fetch dishes. Searching only with name.", async () => {
    const dishesWithIngredients = await dishesService.index({name: "a"});
    expect(dishesWithIngredients[0]).toHaveProperty("ingredients");
  });

  // update
  it("Bad request: Attempt to delete nonexistent dish", async () => {
    delete dish.id;
    await expect(dishesService.update(dish)).rejects.toEqual(new AppError("Prato não encontrado.", 400));
  });
  it("Success to update dish.", async () => {
    await expect(dishesService.update(dish)).resolves.toBe();
  });
});