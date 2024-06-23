const DishesImagesRepository = require("../repositories/DishesImagesRepository");
const DishesImagesService = require("../services/DishesImagesService");

const dishesImagesRepository = new DishesImagesRepository;
const dishesImagesService = new DishesImagesService(dishesImagesRepository);

class DishesImagesController {
  async update(request, response) {
    const user_id = request.user.id;
    const {id} = request.params;
    const imageFile = request.file.filename;

    const dish = await dishesImagesService.update({user_id, id, imageFile});

    return response.json(dish);
  };
};

module.exports = DishesImagesController;