const OrdersRepository = require("../repositories/OrdersRepository");
const OrdersService = require("../services/OrdersService");

const ordersRepository = new OrdersRepository;
const ordersService = new OrdersService(ordersRepository);

class OrdersController {
  async create(request, response) {
    const user_id = request.user.id;
    const {description} = request.body;

    const newOrder = await ordersService.create({user_id, description});

    response.json(newOrder);
  };

  async index(request, response) {
    const userRole = request.user.role;
    const user_id = request.user.id;

    const orders = await ordersService.index({userRole, user_id});

    response.json(orders);
  };

  async update(request, response) {
    const {id} = request.params;
    let {status} = request.body;

    const updatedOrder = await ordersService.update({id, status});

    response.json(updatedOrder);
  };
};

module.exports = OrdersController;