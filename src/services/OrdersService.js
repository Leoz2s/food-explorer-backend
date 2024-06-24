const AppError = require("../utils/AppError");

class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  };

  async create({user_id, description}) {
    const newOrder = await this.ordersRepository.createOrder({user_id, description});
    return newOrder;
  };

  async index({userRole, user_id}) {
    const orders = await this.ordersRepository.indexOrders({userRole, user_id});
    return orders;
  };

  async update({id, status}) {
    const order = await this.ordersRepository.fetchOrder({id});
    if(!order) {
      throw new AppError("O pedido não existe.", 401);
    };

    if(status == "Pendente") {
      status = "pending";
    }else if(status == "Preparando") {
      status = "preparing";
    }else if(status == "Entregue") {
      status = "delivered";
    };

    let updatedOrder;
    try {
      updatedOrder = await this.ordersRepository.updateOrderStatus({status, order});
    } catch {
      throw new AppError("Não foi possível atualizar o pedido.", 400);
    };

    return updatedOrder;
  };
};

module.exports = OrdersService;