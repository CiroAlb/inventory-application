import { randomUUID } from "node:crypto";
import db from "../database/config/db.js";

export class InventoryModel {
  static async getAll() {
    const inventory = await db.query("SELECT * FROM products");
    const suppliers = await db.query("SELECT * FROM suppliers");
    const sell = await db.query("SELECT * FROM sales");

    return {
      inventory: inventory.rows,
      suppliers: suppliers.rows,
      sell: sell.rows,
    };
  }

  static async create({ input }) {
    const id = randomUUID();
    const {
      title,
      price,
      description,
      category,
      actual_stock,
      minimun_stock,
      id_supplier,
    } = input;

    await db.query(
      `INSERT INTO products (id, title, price, description, category,  actual_stock, minimun_stock, id_supplier)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        id,
        title,
        price,
        description,
        category,

        actual_stock,
        minimun_stock,
        id_supplier,
      ]
    );

    return { id, ...input };
  }

  static async createSupplier({ input }) {
    const id = randomUUID();
    const { name, contacto, telefono, direccion } = input;

    await db.query(
      `INSERT INTO suppliers (id, name, contacto, telefono, direccion)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, name, contacto, telefono, direccion]
    );

    return { id, ...input };
  }

  static async sell({ input, product }) {
    const id = randomUUID();
    const sale_date = new Date()
      .toLocaleDateString("es-ES")
      .slice(0, 8)
      .replace(/\//g, "/");
    const total_price = input.quantity * product.price;

    await db.query(
      `INSERT INTO sales (id, product_id, quantity, sale_date, total_price)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, product.id, input.quantity, sale_date, total_price]
    );

    await db.query(
      `UPDATE products SET actual_stock = actual_Stock - $1 WHERE id = $2`,
      [input.quantity, product.id]
    );

    return { id, product_id: product.id, sale_date, total_price, ...input };
  }

  static async update({ id, input }) {
    const { actual_stock, minimun_stock, price, title } = input;

    const result = await db.query(
      `UPDATE products
       SET actual_stock = actual_stock + $1,
           minimun_stock = $2,
           price = $3,
           title = $4
       WHERE id = $5
       RETURNING *`,
      [actual_stock, minimun_stock, price, title, id]
    );

    if (result.rowCount === 0) return false;

    return result.rows[0];
  }

  static async delete({ id }) {
    const result = await db.query(`DELETE FROM products WHERE id = $1`, [id]);
    return result.rowCount > 0;
  }
}
