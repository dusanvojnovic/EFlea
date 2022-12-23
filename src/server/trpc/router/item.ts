import { addItemSchema, ImageType } from "../../../schema/item.schema";
import { router, publicProcedure } from "../trpc";
import * as trpc from "@trpc/server";
import z, { any } from "zod";

export const itemRouter = router({
  addItem: publicProcedure
    .input(addItemSchema)
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
            images: imagesUrl as string,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
