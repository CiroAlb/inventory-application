import { randomUUID } from "node:crypto";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);

const inventory = readJSON("../products.json");
const supplier = readJSON("../suppliers.json");

export class InventoryModel {
  static async getAll() {
    return { inventory, supplier };
  }

  static async create({ input }) {
    const newProduct = {
      id: randomUUID(),
      ...input,
    };

    inventory.push(newProduct);

    return newProduct;
  }

  static async createSupplier({ input }) {
    const newSupplier = {
      id: randomUUID(),
      ...input,
    };

    supplier.push(newSupplier);

    return newSupplier;
  }

  static async update({ id, input }) {
    const productIndex = inventory.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return false;
    }

    inventory[productIndex] = {
      ...inventory[productIndex],
      actualStock: inventory[productIndex].actualStock + input.actualStock,
      minimunStock: input.minimunStock,
      price: input.price,
      title: input.title,
    };

    return inventory[productIndex];
  }

  static async delete({ id }) {
    const productIndex = inventory.findIndex((product) => product.id === id);
    if (productIndex === -1) return false;

    inventory.splice(productIndex, 1);
    return true;
  }
}
