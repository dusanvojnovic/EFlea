// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { itemRouter } from "./item";
import { imageRouter } from "./image";
import { conversationRouter } from "./conversation";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  item: itemRouter,
  image: imageRouter,
  conversation: conversationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
