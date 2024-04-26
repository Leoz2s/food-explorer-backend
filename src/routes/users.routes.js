const {Router} = require("express");
const usersRoutes = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController;

function myMiddlware(request, response, next) {
  const {role} = request.body;

  if(role !== "admin") {
    return response.json({message: "user unauthorized"})
  }

  next();
};
usersRoutes.use(myMiddlware);

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;