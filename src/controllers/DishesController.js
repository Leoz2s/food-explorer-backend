const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const {image, name, category, ingredients, price, description} = request.body;
    const {user_id} = request.params;

    const [dish_id] = await knex("dishes").insert({
      user_id, image, name, category, price, description
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      const lowerCaseIngredient = ingredient.toLowerCase();
      return {dish_id, user_id, name: lowerCaseIngredient}
    });
    await knex("ingredients").insert(ingredientsInsert);

    response.json();
  };

  async show(request, response) {
    const {id} = request.params;

    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");

    return response.json({...dish, ingredients});
  };

  async delete(request, response) {
    const {id} = request.params;

    await knex("dishes").where({id}).delete();

    return response.json();
  };

  async index(request, response) {
    const {name, ingredients} = request.query;

    let dishes;

    if(ingredients) {
      const filterIngredients = ingredients.split(' ').map(ingredient => ingredient.trim().toLowerCase());
      dishes = await knex("ingredients")
        .select(["dishes.id", "dishes.name"])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.name");
        
    } else {
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
    const {image, name, category, ingredients, price, description} = request.body;
    const {id} = request.params;
    const {user_id} = request.query;

    const dish = await knex("dishes").where({id});
    const dishIngredients = await knex("ingredients").where({dish_id: id});

    if(!dish) {
      throw new AppError("Prato não encontrado.");
    };
    dish.image = image ?? dish.image;
    dish.name = name ?? dish.name;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;
    dish.description = description ?? dish.description;
    console.log(dish)
    await knex("dishes").where({id}).update({
      image, name, category, price, description
    });

    if(dishIngredients) {
      await knex("ingredients").where({dish_id: id}).delete();
    };
    const insertIngredients = ingredients.map(ingredient => {
      const lowerCaseIngredient = ingredient.toLowerCase();
      return {dish_id: id, user_id, name: lowerCaseIngredient};
    });
    await knex("ingredients").insert(insertIngredients);

    return response.status(200).json();
  };
};

module.exports = DishesController;