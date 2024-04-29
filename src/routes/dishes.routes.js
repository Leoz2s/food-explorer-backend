const {Router} = require("express");
const dishesRoutes = Router();

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController;

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const DishesImagesController = require("../controllers/DishesImagesController");
const dishesImagesController = new DishesImagesController;

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.put("/:id", dishesController.update);
dishesRoutes.patch("/:id/image", upload.single("image"), dishesImagesController.update);

module.exports = dishesRoutes;