const AppError = require("../utils/AppError");

class FavoriteDishesService {
  constructor(favoriteDishesRepository) {
    this.favoriteDishesRepository = favoriteDishesRepository;
  };

  async create({id, user_id}) {
    const checkIfIsAlreadyFavorite = await this.favoriteDishesRepository.fetchFavorite({user_id, id});
    if(checkIfIsAlreadyFavorite) {
      throw new AppError("O prato já está favoritado.", 400);
    };

    const favorite_id = await this.favoriteDishesRepository.createFavorite({user_id, id});

    return favorite_id;
  };

  async show({id, user_id}) {
    const favorite = await this.favoriteDishesRepository.fetchFavorite({user_id, id});

    let isFavorited;
    favorite ? isFavorited = true : isFavorited = false;

    return isFavorited;
  };

  async delete({id, user_id}) {
    const favorite = await this.favoriteDishesRepository.fetchFavorite({user_id, id});
    if(!favorite) {
      throw new AppError("Este prato não está favoritado.", 400);
    };

    await this.favoriteDishesRepository.deleteFavorite({user_id, id});

    return;
  };

  async index({user_id}) {
    const favorites = await this.favoriteDishesRepository.fetchUserFavorites({user_id});
    const favoritesDishId = favorites.map(favorite => {return favorite.dish_id});

    const favoritesDishes = await this.favoriteDishesRepository.fetchFavoriteDishes({favoritesDishId});

    return favoritesDishes;
  };
};

module.exports = FavoriteDishesService;