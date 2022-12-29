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
});
