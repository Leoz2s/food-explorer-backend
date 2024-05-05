const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FavoriteDishesController {
  async create(request, response) {
    const {id} = request.params;
    const user_id = request.user.id;

    const checkIfIsAlreadyFavorite = await knex("favorites").where({user_id, dish_id: id});
    if(checkIfIsAlreadyFavorite[0]) {
      throw new AppError("O prato já está favoritado.", 400);
    };

    const favorite_id = await knex("favorites").insert({user_id, dish_id: id});

    response.json({favorite_id});
  };

  async show(request, response) {
    const {id} = request.params;
    const user_id = request.user.id;

    const favorite = await knex("favorites").where({user_id, dish_id: id}).first();

    let isFavorited;
    favorite ? isFavorited = true : isFavorited = false;

    return response.json(isFavorited);
  };

  async delete(request, response) {
    const {id} = request.params;
    const user_id = request.user.id;

    const favorite = await knex("favorites").where({user_id, dish_id: id}).first();
    if(!favorite) {
      throw new AppError("Este prato não está favoritado.", 400);
    };

    await knex("favorites").where({user_id, dish_id: id}).delete();

    return response.json();
  };
};

module.exports = FavoriteDishesController;