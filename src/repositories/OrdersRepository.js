const knex = require("../database/knex");

class OrderRepository {
  async createOrder({user_id, description}) {
    const newOrder = await knex("orders").insert({user_id, description});
    return newOrder;
  };

  async indexOrders({userRole, user_id}) {
    let orders;
    if(userRole == "admin") {
      orders = await knex("orders");
      } else {
      orders = await knex("orders").where({user_id});
    };
    return orders;
  };

  async fetchOrder({id}) {
    const order = await knex("orders").where({id}).first();
    return order;
  };

  async updateOrderStatus({status, order}) {
    const updatedOrder = await knex("orders").update({status}).where({id: order.id});
    return updatedOrder; 
  };
};

module.exports = OrderRepository;