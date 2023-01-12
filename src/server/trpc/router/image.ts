import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const imageRouter = router({
  getPreviewPicture: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const previewPicture = await ctx.prisma.image.findFirst({
          where: {
            itemId: id,
          },
        });
        if (previewPicture) {
          return previewPicture.url;
        }
      } catch (error) {
        console.error(error);
      }
    }),
  getAllPictures: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const images = await ctx.prisma.image.findMany({
          where: {
            itemId: id,
          },
        });
        return images;
      } catch (error) {
        console.error(error);
      }
    }),
  removePicture: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { url } = input;
      try {
        await ctx.prisma.image.delete({
          where: {
            url,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
