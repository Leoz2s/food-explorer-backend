const FavoriteDishesRepository = require("../repositories/FavoriteDishesRepository");
const FavoriteDishesService = require("../services/FavoriteDishesService");

const favoriteDishesRepository = new FavoriteDishesRepository;
const favoriteDishesService = new FavoriteDishesService(favoriteDishesRepository);

class FavoriteDishesController {
  async create(request, response) {
    const {id} = request.params;
    const user_id = request.user.id;

    const favorite_id = await favoriteDishesService.create({id, user_id});

    response.json({favorite_id});
  };

  async show(request, response) {
    const {id} = request.params;
    const user_id = request.user.id;

    const isFavorited = await favoriteDishesService.show({id, user_id});

    return response.json(isFavorited);
  };

  async delete(request, response) {
    const {id} = request.params;
    const user_id = request.user.id;

    await favoriteDishesService.delete({id, user_id});

    return response.json();
  };

  async index(request, response) {
    const user_id = request.user.id;

    const favoritesDishes = await favoriteDishesService.index({user_id});

    return response.json(favoritesDishes);
  };
};

module.exports = FavoriteDishesController;