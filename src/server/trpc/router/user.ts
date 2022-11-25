import { createUserSchema } from "../../../schema/user.schema";
import { router, publicProcedure } from "../trpc";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import bcrypt from "bcrypt";

export const userRouter = router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email, city, password, confirmPassword } =
        input;
      if (confirmPassword !== password)
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "Passwords doesn't match",
        });

      const hashedPassword = bcrypt.hashSync(password, 10);
      try {
        const user = await ctx.prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            city,
            password: hashedPassword,
          },
        });
        return user;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User already exists",
            });
          }

          throw new trpc.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      }
    }),
});
