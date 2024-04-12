import { initTRPC } from "@trpc/server";
import {
  fetchRequestHandler,
  type FetchCreateContextFnOptions
} from "@trpc/server/adapters/fetch";
import { type APIRoute } from "astro";
import { z } from "zod";

export const prerender = false;

export function createContext({
  req,
  resHeaders
}: FetchCreateContextFnOptions) {
  const user = {
    token: req.headers.get("authorization") ?? "",
    name: req.headers.get("username") ?? "anonymous"
  };
  return { req, resHeaders, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create();

type User = {
  id: string;
  name: string;
  bio?: string;
};
const users: Record<string, User> = {};

export const appRouter = t.router({
  getUserById: t.procedure.input(z.string()).query((opts) => {
    return users[opts.input]; // input type is string
  }),
  createUser: t.procedure
    // validate input with Zod
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(3),
        bio: z.string().max(142).optional()
      })
    )
    .mutation((opts) => {
      const user: User = { ...opts.input };
      users[user.id] = user;
      return user;
    })
});

export const ALL: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: opts.request,
    router: appRouter,
    createContext
  });
};

// export type definition of API
export type AppRouter = typeof appRouter;
