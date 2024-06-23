const AppError = require("../utils/AppError");

class DishesImagesService {
  constructor(dishesImagesRepository) {
    this.dishesImagesRepository = dishesImagesRepository;
  };

  async update({user_id, id, imageFile}) {
    const dish = await this.dishesImagesRepository.fetchDish({user_id, id});

    if(!dish) {
      throw new AppError("O prato não existe.", 400);
    }else if(dish.image) {
      await this.dishesImagesRepository.deleteImageFile({dish});
    };

    const filename = await this.dishesImagesRepository.saveImageFile({imageFile});
    dish.image = filename;

    await this.dishesImagesRepository.updateDishImage({dish, user_id, id});

    return dish;
  };
};

module.exports = DishesImagesService;