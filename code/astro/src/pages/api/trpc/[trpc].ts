import {
  fetchRequestHandler,
  type FetchCreateContextFnOptions,
} from "@trpc/server/adapters/fetch";
import { type APIRoute } from "astro";
import { appRouter } from "src/server/_init";

export const prerender = false;

export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const user = {
    token: req.headers.get("authorization") ?? "",
    name: req.headers.get("username") ?? "anonymous",
  };
  return { req, resHeaders, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

export const ALL: APIRoute = (opts) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: opts.request,
    router: appRouter,
    createContext,
  });
};
