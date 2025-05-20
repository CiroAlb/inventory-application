import { randomUUID } from "node:crypto";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);

const shop = readJSON("../shop.json");

export class ShopModel {
  static async getAll(/* { category } */) {
    /* if (category) {
      return shop.filter((shop) =>
        shop.category.some((c) => c.toLowerCase() === category.toLowerCase())
      );
    } */
    return shop;
  }
}
