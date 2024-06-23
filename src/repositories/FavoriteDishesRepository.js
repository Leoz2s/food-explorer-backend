const knex = require("../database/knex");

class FavoriteDishesRepository {
  async fetchFavorite({user_id, id}) {
    const favorite = await knex("favorites").where({user_id, dish_id: id}).first();
    return favorite;
  };

  async createFavorite({user_id, id}) {
    const favorite_id = await knex("favorites").insert({user_id, dish_id: id});
    return favorite_id;
  };

  async deleteFavorite({user_id, id}) {
    return await knex("favorites").where({user_id, dish_id: id}).delete();
  };

  async fetchUserFavorites({user_id}) {
    const favorites = await knex("favorites").where({user_id});
    return favorites;
  };

  async fetchFavoriteDishes({favoritesDishId}) {
    const favoritesDishes = await knex("dishes").whereIn('id', favoritesDishId);
    return favoritesDishes;
  };
};

module.exports = FavoriteDishesRepository;