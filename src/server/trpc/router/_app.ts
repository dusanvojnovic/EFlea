// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { itemRouter } from "./item";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
