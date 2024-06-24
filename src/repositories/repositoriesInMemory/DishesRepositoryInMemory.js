class DishesRepositoryInMemory {
  // create
  async checkDishWithSameName({name}) {
    if(name === "Dish") {
      return {id: 1, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish."};
    } else { return };
  };

  async createDish({user_id, name, category, price, description}) {
    return [2];
  };

  async createIngredients(ingredientsInsert) {
    return;
  };

  // show
  async fetchDishWithIngredients({id}) {
    if(id) {
      const dish = {id: id, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish."};
      const ingredients = [{id: 1,	dish_id: id, user_id: 1,	name: "Food"}, {id: 2,	dish_id: id, user_id: 1,	name: "Nutrients"}];
      return [dish, ingredients];
    } else { return [] };
  };

  async fetchDish({id}) {
    if(id) {
      return {id, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish."};
    } else { return };
  };

  // delete
  async deleteDish({id}) {
    return;
  };

  // index
  async fetchDishesByIngredientsAndName({filterIngredients, name}) {
    return [
      { id: 1, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish.", },
      { id: 2, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish.", },
    ];
  };

  async fetchDishesByName({name}) {
    return [
      { id: 1, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish.", },
      { id: 2, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish.", },
    ];
  };

  async fetchDishesByIngredients({filterIngredients}) {
    return [
      { id: 1, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish.", },
      { id: 2, user_id: 1, image: null, name: "Dish", category: "Refeição", price: "R$ 10,00", description: "This is a dish.", },
    ];
  };

  async getAllIngredients() {
    return [{ id: 1, dish_id: 1, user_id: 1, name: "Food" }, { id: 2, dish_id: 1, user_id: 1, name: "Nutrients" },
      { id: 3, dish_id: 2, user_id: 1, name: "Minerals" }, { id: 4, dish_id: 2, user_id: 1, name: "Vitamins" }];
  };

  // update
  async updateDish({name, category, price, description, id}) {
    return {id, user_id: 1, image: null, name, category, price, description};
  };

  async fetchDishIngredients({id}) {
    return [{ id: 1, dish_id: id, user_id: 1, name: "Food" }, { id: 2, dish_id: id, user_id: 1, name: "Nutrients" },]
  };

  async deleteDishIngredients({id}) {
    return;
  };

  // diskStorage
  async deleteImageFile({dish}) {
    return;
  };
};

module.exports = DishesRepositoryInMemory;