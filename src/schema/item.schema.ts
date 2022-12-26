import z from "zod";
import { imageSchema } from "./image.schema";

export const itemSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.string(),
  acceptExchange: z.boolean(),
  fixedPrice: z.boolean(),
  imgFiles: z.any().nullish(),
  imagesUrl: z.array(imageSchema),
});

export type ItemType = z.TypeOf<typeof itemSchema>;
