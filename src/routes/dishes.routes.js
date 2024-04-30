const {Router} = require("express");
const dishesRoutes = Router();

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController;

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const DishesImagesController = require("../controllers/DishesImagesController");
const dishesImagesController = new DishesImagesController;

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", verifyUserAuthorization(["admin"]), dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", verifyUserAuthorization(["admin"]), dishesController.delete);
dishesRoutes.put("/:id", verifyUserAuthorization(["admin"]), dishesController.update);
dishesRoutes.patch("/:id/image", verifyUserAuthorization(["admin"]), upload.single("image"), dishesImagesController.update);

module.exports = dishesRoutes;