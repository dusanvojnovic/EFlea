import z from "zod";
import ImageUncheckedCreateNestedManyWithoutItemInput from "@prisma/client";

export const addItemSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.string(),
  acceptExchange: z.boolean(),
  fixedPrice: z.boolean(),
  imgFiles: z.any().nullish(),
  imagesUrl: z.array(z.string()).or(z.string()),
});

export type ItemType = z.TypeOf<typeof addItemSchema>;

export type ImageType = {
  url: string;
  id: string;
};
