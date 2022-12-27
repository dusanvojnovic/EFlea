import { itemSchema } from "../../../schema/item.schema";
import { router, publicProcedure } from "../trpc";

export const itemRouter = router({
  addItem: publicProcedure
    .input(itemSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        description,
        title,
        category,
        price,
        acceptExchange,
        fixedPrice,
        imagesUrl,
      } = input;

      try {
        if (!ctx.session?.user?.id) return;
        const newItem = await ctx.prisma.item.create({
          data: {
            description,
            price,
            title,
            category,
            acceptExchange,
            fixedPrice,
            images: {
              create: imagesUrl.map((url) => ({
                url,
              })),
            },
            userId: ctx.session.user.id,
          },
        });
        return newItem;
      } catch (error) {
        console.error(error);
      }
    }),
});
