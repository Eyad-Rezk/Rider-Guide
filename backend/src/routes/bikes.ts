import  express  from "express";
const router = express.Router();
import * as bikesController from "../controllers/bikes";


router.get("/", bikesController.getAllBikes);

router.get("/:id", bikesController.getBikeById);

router.post("/", bikesController.createBike);

router.put("/:id", bikesController.updateBike);

router.delete("/:id", bikesController.deleteBike);

export default router;