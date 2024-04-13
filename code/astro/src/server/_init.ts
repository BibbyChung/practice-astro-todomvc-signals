import { initTRPC } from "@trpc/server";
import type { Context } from "src/pages/api/trpc/[trpc]";
import type { ZodTypeAny, z } from "zod";
import {
  getUserByIdInput,
  getuserByIdHandle,
  createUserInput,
  createUserHandle,
} from "./user.router";

export type AppRouterType = typeof appRouter;

export type HandleOptsType<T extends ZodTypeAny> = {
  ctx: Context;
  input: z.infer<T>;
};

const trpcContext = initTRPC.context<Context>().create();

const userRouter = {
  getUserById: trpcContext.procedure
    .input(getUserByIdInput)
    .query(getuserByIdHandle),
  createUser: trpcContext.procedure
    .input(createUserInput)
    .mutation(createUserHandle),
};

export const appRouter = trpcContext.router({
  ...userRouter,
});
