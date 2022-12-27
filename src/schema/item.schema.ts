import z from "zod";

export const itemSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.string(),
  acceptExchange: z.boolean(),
  fixedPrice: z.boolean(),
  imgFiles: z.any().nullish(),
  imagesUrl: z.array(z.string()),
});

export type ItemType = z.TypeOf<typeof itemSchema>;
