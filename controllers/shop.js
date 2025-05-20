import { ShopModel } from "../storages/shop.js";

export class ShopController {
  static async getAll(req, res) {
    const { category } = req.query;
    const shop = await ShopModel.getAll();
    res.render("index", { products: shop });
  }
}
