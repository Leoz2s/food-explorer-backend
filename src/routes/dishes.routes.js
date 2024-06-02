const {Router} = require("express");
const dishesRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController;

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const DishesImagesController = require("../controllers/DishesImagesController");
const dishesImagesController = new DishesImagesController;

const FavoriteDishesController = require("../controllers/FavoriteDishesController");
const favoriteDishesController = new FavoriteDishesController;

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/:id/favorites", favoriteDishesController.create);
dishesRoutes.get("/:id/favorites", favoriteDishesController.show);
dishesRoutes.delete("/:id/favorites", favoriteDishesController.delete);
dishesRoutes.get("/favorites", favoriteDishesController.index);

dishesRoutes.post("/", verifyUserAuthorization(["admin"]), dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", verifyUserAuthorization(["admin"]), dishesController.delete);
dishesRoutes.put("/:id", verifyUserAuthorization(["admin"]), dishesController.update);
dishesRoutes.patch("/:id/image", verifyUserAuthorization(["admin"]), upload.single("image"), dishesImagesController.update);

module.exports = dishesRoutes;