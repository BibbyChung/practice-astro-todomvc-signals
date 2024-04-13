import { userRouter } from "./user.router";
import { todosRouter } from "./todos.router";
import { trpcContext, type Context } from "./_context";
import type { ZodTypeAny, z } from "zod";

export type AppRouterType = typeof appRouter;

export type HandleOptsType<T extends ZodTypeAny> = {
  ctx: Context;
  input: z.infer<T>;
};

export const appRouter = trpcContext.router({
  user: trpcContext.router(userRouter),
  todos: trpcContext.router(todosRouter),
});
