const {Router} = require('express');
const ordersRoutes = Router();

const OrdersController = require("../controllers/OrdersController");
const ordersController = new OrdersController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.post("/", verifyUserAuthorization(["customer"]), ordersController.create);
ordersRoutes.patch("/:id", verifyUserAuthorization(["admin"]), ordersController.update);
ordersRoutes.get("/", ordersController.index);

module.exports = ordersRoutes;