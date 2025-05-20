import { Router } from "express";
import { ShopController } from "../controllers/shop.js";

export const shopRouter = Router();

shopRouter.get("/", ShopController.getAll);
/* mainRouter.post("/", ShopController.buyElement);

mainRouter.get("/:id", ShopController.getById);
 */
