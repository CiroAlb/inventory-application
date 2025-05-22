import { Router } from "express";
import { InventoryController } from "../controllers/shop.js";

export const shopRouter = Router();

shopRouter.get("/", InventoryController.getAll);

shopRouter.get("/update/:id", InventoryController.getUpdate);
shopRouter.post("/update/:id", InventoryController.update);

shopRouter.get("/add-new", InventoryController.getAllNew);
shopRouter.post("/add-new", InventoryController.create);

shopRouter.get("/sell/:id", InventoryController.getSell);
shopRouter.post("/sell/:id", InventoryController.sell);

shopRouter.get("/delete/:id", InventoryController.getDelete);
shopRouter.post("/delete/:id", InventoryController.delete);

shopRouter.get("/supplier/:id", InventoryController.getSupplier);

shopRouter.get("/add-supplier", InventoryController.getAddSupplier);
shopRouter.post("/add-supplier", InventoryController.addSupplier);
/* mainRouter.post("/", ShopController.buyElement);

mainRouter.get("/:id", ShopController.getById);
 */
