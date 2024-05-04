const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesImagesController {
  async update(request, response) {
    const user_id = request.user.id;
    const {id} = request.params;
    const imageFile = request.file.filename;

    const diskStorage = new DiskStorage;

    const dish = await knex("dishes").where({id, user_id}).first();

    if(!dish) {
      throw new AppError("O prato não existe.", 400);
    }else if(dish.image) {
      await diskStorage.deleteFile(dish.image);
    };

    const filename = await diskStorage.saveFile(imageFile);
    dish.image = filename;

    await knex("dishes").update(dish).where({id, user_id});

    return response.json(dish);
  };
};

module.exports = DishesImagesController;