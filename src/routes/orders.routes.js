const {Router} = require('express');
const ordersRoutes = Router();

const OrdersController = require("../controllers/OrdersController");
const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.patch("/", ordersController.update);

module.exports = ordersRoutes;