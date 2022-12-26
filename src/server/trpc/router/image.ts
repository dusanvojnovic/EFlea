import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const imageRouter = router({
  addImage: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { url } = input;
      try {
        const newImage = await ctx.prisma.image.create({
          data: {
            url,
          },
        });
        return newImage;
      } catch (error) {
        console.error(error);
      }
    }),
});
