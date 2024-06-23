const DishesService = require("../services/DishesService");
const DishesRepository = require("../repositories/DishesRepository");

const dishesRepository = new DishesRepository;
const dishesService = new DishesService(dishesRepository);

class DishesController {
  async create(request, response) {
    const {name, category, ingredients, price, description} = request.body;
    const user_id = request.user.id;
  
    const dish_id = await dishesService.create({name, category, ingredients, price, description, user_id});

    response.json({dish_id});
  };

  async show(request, response) {
    const {id} = request.params;

    const [dish, ingredients] = await dishesRepository.fetchDishWithIngredients({id});

    return response.json({...dish, ingredients});
  };

  async delete(request, response) {
    const {id} = request.params;

    await dishesService.delete({id});

    return response.json();
  };

  async index(request, response) {
    const {name, ingredients} = request.query;

    const dishesWithIngredients = await dishesService.index({name, ingredients});

    return response.json(dishesWithIngredients);
  };

  async update(request, response) {
    let {name, category, price, description, ingredients} = request.body;
    const {id} = request.params;
    const user_id = request.user.id;

    await dishesService.update({name, category, price, description, ingredients, id, user_id});

    return response.status(200).json();
  };
};

module.exports = DishesController;