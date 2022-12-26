import z from "zod";

export const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
  itemId: z.string().optional(),
});

export type ImageType = z.TypeOf<typeof imageSchema>;
