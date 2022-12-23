import z from "zod";

export const uploadImageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export type ImageType = z.TypeOf<typeof uploadImageSchema>;
