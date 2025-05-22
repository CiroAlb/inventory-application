import z from "zod";

const inventorySchema = z.object({
  title: z.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required.",
  }),
  price: z.number().min(0),
  description: z.string(),
  actualStock: z.number().int().positive(),
  minimunStock: z.number().int().positive(),
  category: z.enum(
    ["men's clothing", "jewelery", "electronics", "women's clothing"],
    {
      required_error: "category is required.",
      invalid_type_error: "category must be one of the enum values",
    }
  ),
  idSupplier: z.enum(
    [
      "5e6f7g8h-5555-6666-7777-eeeeeeeeeeee",
      "4d5e6f7g-4444-5555-6666-dddddddddddd",
      "3c4d5e6f-3333-4444-5555-cccccccccccc",
      "2b3c4d5e-2222-3333-4444-bbbbbbbbbbbb",
      "1a2b3c4d-1111-2222-3333-aaaaaaaaaaaa",
    ],
    {
      required_error: "supplier is required.",
      invalid_type_error: "supplier must be one of the enum values",
    }
  ),
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
