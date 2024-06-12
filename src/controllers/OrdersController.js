const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id;
    const {description} = request.body;

    const newOrder = await knex("orders").insert({user_id, description});

    response.json(newOrder);
  };

  async index(request, response) {
    const userRole = request.user.role;
    const user_id = request.user.id;

    let orders;
    if(userRole == "admin") {
      orders = await knex("orders");
    } else {
      orders = await knex("orders").where({user_id});
    };

    response.json(orders);
  };

  async update(request, response) {
    const {order_id, status} = request.body;

    const order = await knex("orders").where({id: order_id}).first();
    if(!order) {
      throw new AppError("O pedido não existe.", 400);
    };

    let updatedOrder;
    try {
      updatedOrder = await knex("orders").update({status}).where({id: order.id});
    } catch {
      throw new AppError("Não foi possível atualizar o pedido.", 400)
    };

    response.json(updatedOrder);
  };
};

module.exports = OrdersController;