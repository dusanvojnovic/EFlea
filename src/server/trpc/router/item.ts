import { z } from "zod";
import { itemSchema } from "../../../schema/item.schema";
import { publicProcedure, router } from "../trpc";

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
  getItemsForListPreview: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      const { category } = input;
      try {
        const items = await ctx.prisma.item.findMany({
          where: {
            category,
          },
        });
        return items.slice(0, 5);
      } catch (error) {
        throw new Error("Something went wrong");
      }
    }),
  getItemsByUser: publicProcedure.query(async ({ ctx }) => {
    try {
      const items = await ctx.prisma.item.findMany({
        where: {
          userId: ctx.session?.user?.id,
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
  editItem: publicProcedure
    .input(itemSchema.merge(z.object({ itemId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const {
        description,
        title,
        category,
        price,
        acceptExchange,
        fixedPrice,
        imagesUrl,
        itemId,
      } = input;

      try {
        const updatedItem = await ctx.prisma.item.update({
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
          },
          where: {
            id: itemId,
          },
        });
        return updatedItem;
      } catch (error) {
        console.error(error);
      }
    }),
  getItemById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const item = await ctx.prisma.item.findFirst({
          where: {
            id,
          },
        });
        return item;
      } catch (error) {
        console.error(error);
      }
    }),
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        await ctx.prisma.item.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
