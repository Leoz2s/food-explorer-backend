const {Router} = require("express");
const routes = Router();

const usersRoutes = require("./users.routes");
const dishesRoutes = require("./dishes.routes");
const sessionsRoutes = require("./sessions.routes");
const ordersRoutes = require("./orders.routes");

routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/orders", ordersRoutes);

module.exports = routes;