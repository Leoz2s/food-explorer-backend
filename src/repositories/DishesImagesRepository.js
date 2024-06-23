const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

const diskStorage = new DiskStorage;

class DishesImagesRepository {
  async fetchDish({id, user_id}) {
    const dish = await knex("dishes").where({id, user_id}).first();
    return dish;
  };

  async updateDishImage({dish, id, user_id}) {
    return await knex("dishes").update(dish).where({id, user_id});
  };

  async deleteImageFile({dish}) {
    return await diskStorage.deleteFile(dish.image);
  };

  async saveImageFile({imageFile}) {
    const filename = await diskStorage.saveFile(imageFile);
    return filename;
  };
};

module.exports = DishesImagesRepository;