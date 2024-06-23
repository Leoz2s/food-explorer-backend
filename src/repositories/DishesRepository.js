const knex = require("../database/knex");

class DishesRepository {
  // create
  async checkDishWithSameName({name}) {
    const dishWithSameName = await knex("dishes").where({name}).first();
    return dishWithSameName;
  };

  async createDish({user_id, name, category, price, description}) {
    const dish_id = await knex("dishes").insert({
      user_id, name, category, price, description
    });
    return dish_id;
  };

  async createIngredients(ingredientsInsert) {
    return await knex("ingredients").insert(ingredientsInsert);
  };

  // show
  async fetchDishWithIngredients({id}) {
    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");
    return [dish, ingredients];
  };

  async fetchDish({id}) {
    const dish = await knex("dishes").where({id}).first();
    return dish;
  };

  // delete
  async deleteDish({id}) {
    return await knex("dishes").where({id}).delete();
  };

  // index
  async fetchDishesByIngredientsAndName({filterIngredients, name}) {
    const dishesByIngredientsAndName = await knex("ingredients")
        .select(["*"])
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .whereLike("dishes.name", `%${name}%`)
        .groupBy("dishes.id")
        .orderBy("dishes.name");

    return dishesByIngredientsAndName;
  };

  async fetchDishesByName({name}) {
    const dishesByName = await knex("dishes")
      .whereLike("name", `%${name}%`)
      .orderBy("name");

    return dishesByName;
  };

  async fetchDishesByIngredients({filterIngredients}) {
    const dishesByIngredients = await knex("ingredients")
      .select(["*"])
      .whereIn("ingredients.name", filterIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.name");

    return dishesByIngredients;
  };

  async getAllIngredients() {
    const allIngredients = await knex("ingredients");
    return allIngredients;
  };

  // update
  async updateDish({name, category, price, description, id}) {
    return await knex("dishes").update({name, category, price, description}).where({id});
  };

  async fetchDishIngredients({id}) {
    const dishIngredients = await knex("ingredients").where({dish_id: id});
    return dishIngredients;
  };

  async deleteDishIngredients({id}) {
    return await knex("ingredients").where({dish_id: id}).delete();
  };
};

module.exports = DishesRepository;