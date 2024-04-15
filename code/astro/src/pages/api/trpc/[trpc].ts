import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { createContext, trpcContext } from "src/server/_context";
import { appRouter } from "src/server/_init";

export const prerender = false;

export const ALL: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: opts.request,
    router: appRouter,
    createContext,
  });
};
