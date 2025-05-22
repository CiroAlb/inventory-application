import z from "zod";
import { InventoryModel } from "../storages/shop.js";

/* const supplierIdList = await supportIdSupplier();

export async function supportIdSupplier() {
  const { inventory, suppliers } = await InventoryModel.getAll();
  const supplierIdList = [];

  suppliers.map((supplier) => supplierIdList.push(supplier.id));
  return supplierIdList;
} */

const sellSchema = z.object({
  quantity: z.number().int().positive(),
});

const inventorySchema = z.object({
  title: z.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required.",
  }),
  price: z.number().positive(),
  description: z.string(),
  actualStock: z.number().int().nonnegative(),
  minimunStock: z.number().int().positive(),
  category: z.enum(
    ["men's clothing", "jewelery", "electronics", "women's clothing"],
    {
      required_error: "category is required.",
      invalid_type_error: "category must be one of the enum values",
    }
  ),
  idSupplier: z.string({
    required_error: "supplier is required.",
    invalid_type_error: "supplier must be a string.",
  }),
});

const supplierSchema = z.object({
  name: z.string({
    required_error: "name is required.",
    invalid_type_error: "name must be a string.",
  }),

  contacto: z.string({
    required_error: "contacto is required.",
    invalid_type_error: "contacto must be a string.",
  }),

  telefono: z
    .string({
      required_error: "telefono is required.",
      invalid_type_error: "telefono must be a string.",
    })
    .regex(/^\+?[0-9\s\-]+$/, {
      message: "telefono must be a valid phone number.",
    }),

  direccion: z.string({
    required_error: "direccion is required.",
    invalid_type_error: "direccion must be a string.",
  }),
});

export function validateProduct(input) {
  const transformedInput = {
    ...input,
    price: Number(input.price),
    actualStock: Number(input.actualStock),
    minimunStock: Number(input.minimunStock),
  };

  return inventorySchema.safeParse(transformedInput);
}

export function validatePartialProduct(input) {
  const transformedInput = {
    ...input,
    ...(input.price !== undefined && { price: Number(input.price) }),
    ...(input.actualStock !== undefined && {
      actualStock: Number(input.actualStock),
    }),

    ...(input.minimunStock !== undefined && {
      minimunStock: Number(input.minimunStock),
    }),
  };

  return inventorySchema.partial().safeParse(transformedInput);
}

export function validateSupplier(input) {
  return supplierSchema.safeParse(input);
}

export function validateSell(input) {
  return sellSchema.safeParse(input);
}
