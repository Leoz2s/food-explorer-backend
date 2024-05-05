const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    const {name, category, ingredients, price, description} = request.body;
    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      user_id, name, category, price, description
    });

    if(ingredients[0]) {
      const ingredientsInsert = ingredients.map(ingredient => {
        const lowerCaseIngredient = ingredient.toLowerCase();
        return {dish_id, user_id, name: lowerCaseIngredient}
      });
      await knex("ingredients").insert(ingredientsInsert);
    };

    response.json({dish_id});
  };

  async show(request, response) {
    const {id} = request.params;

    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");

    return response.json({...dish, ingredients});
  };

  async delete(request, response) {
    const {id} = request.params;

    const dish = await knex("dishes").where({id}).first();
    if(!dish) {
      throw new AppError("O prato a ser deletado não existe.", 400);
    };

    await knex("dishes").where({id}).delete();

    if(dish.image) {
      const diskStorage = new DiskStorage;
      await diskStorage.deleteFile(dish.image);
    };

    return response.json();
  };

  async index(request, response) {
    const {name, ingredients} = request.query;

    let dishes;

    if(ingredients === name) {
      const filterIngredients = ingredients.split(' ').map(ingredient => ingredient.trim().toLowerCase());
      const dishesByIngredients = await knex("ingredients")
        .select(["*"])
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name");

      const dishesByName = await knex("dishes")
        .whereLike("name", `%${name}%`)
        .orderBy("name");

      dishes = Object.assign(dishesByIngredients, dishesByName);

    }else if(ingredients) {
      const filterIngredients = ingredients.split(' ').map(ingredient => ingredient.trim().toLowerCase());
      dishes = await knex("ingredients")
        .select(["*"])
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .whereLike("dishes.name", `%${name}%`)
        .groupBy("dishes.id")
        .orderBy("dishes.name");
        
    }else {
      dishes = await knex("dishes")
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    };

    const ingredientsFromDishes = await knex("ingredients");
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = ingredientsFromDishes.filter(ingredient => ingredient.dish_id === dish.id);
      return {
        ...dish,
        ingredients: dishIngredients
      };
    });

    return response.json(dishesWithIngredients);
  };

  async update(request, response) {
    let {name, category, price, description, ingredients} = request.body;
    const {id} = request.params;
    const user_id = request.user.id;

    const dish = await knex("dishes").where({id});

    if(!dish[0]) {
      throw new AppError("Prato não encontrado.");
    };
    name = name ?? dish[0].name;
    category = category ?? dish[0].category;
    price = price ?? dish[0].price;
    description = description ?? dish[0].description;
    await knex("dishes").update({name, category, price, description}).where({id});
    
    const dishIngredients = await knex("ingredients").where({dish_id: id});

    if(dishIngredients) {
      await knex("ingredients").where({dish_id: id}).delete();
    };
    const insertIngredients = ingredients.map(ingredient => {
      let lowerCaseIngredient
      if(ingredient.name) {
        lowerCaseIngredient = ingredient.name.toLowerCase();
      }else {
        lowerCaseIngredient = ingredient.toLowerCase();
      }
      return {dish_id: id, user_id, name: lowerCaseIngredient};
    });
    await knex("ingredients").insert(insertIngredients);

    return response.status(200).json();
  };
};

module.exports = DishesController;