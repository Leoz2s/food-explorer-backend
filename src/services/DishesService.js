const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository;
  };

  async create({name, category, ingredients, price, description, user_id}) {
    const dishWithSameName = await this.dishesRepository.checkDishWithSameName({name});
    if(dishWithSameName) {
      throw new AppError("Já existe um prato com este nome. Troque o nome do prato para cadastrá-lo.", 400);
    };

    const [dish_id] = await this.dishesRepository.createDish({user_id, name, category, price, description});

    if(ingredients[0]) {
      const ingredientsInsert = ingredients.map(ingredient => {
        const lowerCaseIngredient = ingredient.toLowerCase();
        return {dish_id, user_id, name: lowerCaseIngredient};
      });

      await this.dishesRepository.createIngredients(ingredientsInsert);
    };

    return dish_id;
  };

  async show({id}) {
    const [dish, ingredients] = await this.dishesRepository.fetchDishWithIngredients({id});
    return [dish, ingredients];
  };

  async delete({id}) {
    const dish = await this.dishesRepository.fetchDish({id});
    if(!dish) {
      throw new AppError("O prato a ser deletado não existe.", 400);
    };

    await this.dishesRepository.deleteDish({id});

    if(dish.image) {
      const diskStorage = new DiskStorage;
      await diskStorage.deleteFile(dish.image);
    };

    return;
  };

  async index({name, ingredients}) {
    let dishes;

    if(ingredients === name) {
      const filterIngredients = ingredients.split(' ').map(ingredient => ingredient.trim().toLowerCase());
      const dishesByIngredients = await this.dishesRepository.fetchDishesByIngredients({filterIngredients});

      const dishesByName = await this.dishesRepository.fetchDishesByName({name});

      dishes = Object.assign(dishesByIngredients, dishesByName);

    }else if(ingredients) {
      const filterIngredients = ingredients.split(' ').map(ingredient => ingredient.trim().toLowerCase());
      dishes = await this.dishesRepository.fetchDishesByIngredientsAndName({filterIngredients, name});

    }else {
      dishes = await this.dishesRepository.fetchDishesByName({name});
    };

    const ingredientsFromDishes = await this.dishesRepository.getAllIngredients();
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = ingredientsFromDishes.filter(ingredient => ingredient.dish_id === dish.id);
      return {
        ...dish,
        ingredients: dishIngredients
      };
    });

    return dishesWithIngredients;
  };

  async update({name, category, price, description, ingredients, id, user_id}) {
    const dish = await this.dishesRepository.fetchDish({id});

    if(!dish) {
      throw new AppError("Prato não encontrado.");
    };
    name = name ?? dish[0].name;
    category = category ?? dish[0].category;
    price = price ?? dish[0].price;
    description = description ?? dish[0].description;
    await this.dishesRepository.updateDish({name, category, price, description, id});
    
    const dishIngredients = await this.dishesRepository.fetchDishIngredients({id});

    if(dishIngredients) {
      await this.dishesRepository.deleteDishIngredients({id});
    };
    const insertIngredients = ingredients.map(ingredient => {
      let lowerCaseIngredient;
      if(ingredient.name) {
        lowerCaseIngredient = ingredient.name.toLowerCase();
      }else {
        lowerCaseIngredient = ingredient.toLowerCase();
      };

      return {dish_id: id, user_id, name: lowerCaseIngredient};
    });
    await this.dishesRepository.createIngredients(insertIngredients);

    return;
  };
};

module.exports = DishesService;