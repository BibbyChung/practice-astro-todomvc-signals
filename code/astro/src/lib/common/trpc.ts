import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { tap } from "@trpc/server/observable";
import type { AppRouter } from "src/pages/api/trpc/[trpc]";
import { getUUID } from "./util";

const consoleFn = (isLog: boolean) => () => {
  if (isLog) {
    return ({ op, next }: { op: any; next: any }) => {
      console.log("->", op.type, op.path, op.input);

      return next(op).pipe(
        tap({
          next(result) {
            console.log("<-", op.type, op.path, op.input, ":", result);
          },
        })
      );
    };
  }
  return ({ op, next }: { op: any; next: any }) => next(op);
};

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    consoleFn(false),
    httpBatchLink({
      url: "/api/trpc",
      headers() {
        return {
          Authorization: getUUID(),
        };
      },
    }),
  ],
});
