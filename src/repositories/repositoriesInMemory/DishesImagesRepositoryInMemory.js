class DishesImagesRepositoryInMemory {
  async fetchDish({id, user_id}) {
    if(id) { return {id, user_id, image: "image.png"};
    } else { return };
  };
  
  async deleteImageFile({dish}) {
    return;
  };
  
  async saveImageFile({imageFile}) {
    return `${imageFile}`;
  };
  
  async updateDishImage({dish, id, user_id}) {
    return dish;
  };
};

module.exports = DishesImagesRepositoryInMemory;