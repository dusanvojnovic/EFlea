import { z } from "zod";
import { itemSchema } from "../../../schema/item.schema";
import { router, publicProcedure } from "../trpc";

export const itemRouter = router({
  getItemsByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      const { category } = input;
      try {
        const items = await ctx.prisma.item.findMany({
          where: {
            category,
          },
        });
        return items;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    }),
  getItemsByUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const items = await ctx.prisma.item.findMany({
          where: {
            userId: id,
          },
        });
        return items;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    }),
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
