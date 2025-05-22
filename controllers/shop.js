import { InventoryModel } from "../storages/shop.js";
import {
  validateProduct,
  validatePartialProduct,
  validateSupplier,
  validateSell,
} from "../schemas/shop.js";

export class InventoryController {
  static async getAll(req, res) {
    const { inventory, suppliers, sell } = await InventoryModel.getAll();
    res.render("index", {
      inventory: inventory,
      suppliers: suppliers,
      sell: sell,
    });
  }

  static async getAllNew(req, res) {
    const { inventory, suppliers } = await InventoryModel.getAll();
    res.render("add-new", { inventory: inventory, suppliers: suppliers });
  }

  static async getSell(req, res) {
    const { id } = req.params;
    const { inventory, suppliers } = await InventoryModel.getAll();
    const product = inventory.find((item) => item.id === id);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("sell", { product: product, suppliers: suppliers });
  }

  static async sell(req, res) {
    const { id } = req.params;
    const result = validateSell({
      ...req.body,
      quantity: Number(req.body.quantity),
    });
    const { inventory, supplier } = await InventoryModel.getAll();
    const product = inventory.find((item) => item.id === id);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    await InventoryModel.sell({ input: result.data, product: product });

    return res.redirect("/");
  }

  static async getAddSupplier(req, res) {
    res.render("add-supplier");
  }

  static async getUpdate(req, res) {
    const { id } = req.params;
    const { inventory, supplier } = await InventoryModel.getAll();
    const product = inventory.find((item) => item.id === id);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("update", { product });
  }

  static async getDelete(req, res) {
    const { id } = req.params;
    const { inventory, supplier } = await InventoryModel.getAll();
    const product = inventory.find((item) => item.id === id);

    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("delete", { product });
  }

  static async getSupplier(req, res) {
    const { id } = req.params;
    const { inventory, suppliers } = await InventoryModel.getAll();
    const findedSupplier = suppliers.find((s) => s.id === id);

    if (!findedSupplier) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("supplier", { findedSupplier });
  }

  static async create(req, res) {
    const result = validateProduct(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    await InventoryModel.create({ input: result.data });

    return res.redirect("/");
  }

  static async addSupplier(req, res) {
    const result = validateSupplier(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    await InventoryModel.createSupplier({ input: result.data });

    return res.redirect("/");
  }

  static async update(req, res) {
    const result = validatePartialProduct({
      ...req.body,
      actualStock: Number(req.body.actualStock),
      minimunStock: Number(req.body.minimunStock),
      price: Number(req.body.price),
    });

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    await InventoryModel.update({
      id,
      input: result.data,
    });

    return res.redirect("/");
  }

  static async delete(req, res) {
    const { id } = req.params;
    console.log({ id });
    const result = await InventoryModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.redirect("/");
  }
}
