// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { itemRouter } from "./item";
import { imageRouter } from "./image";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter,
  item: itemRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
