class FavoriteDishesRepositoryInMemory {
  async fetchFavorite({user_id, id}) {
    if(id == 1) {
      return {user_id, id, dish_id: 1};
    } else { return };
  };

  async createFavorite({user_id, id}) {
    return 1;
  };

  async deleteFavorite({user_id, id}) {
    return;
  };

  async fetchUserFavorites({user_id}) {
    return [{user_id, dish_id: 1}, {user_id, dish_id: 2}];
  };

  async fetchFavoriteDishes({favoritesDishId}) {
    return [{id: 1}, {id: 2}];
  };
};

module.exports = FavoriteDishesRepositoryInMemory;