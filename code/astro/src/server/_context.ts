import { initTRPC } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export function createContext({ req, resHeaders }: FetchCreateContextFnOptions) {
  const user = {
    token: req.headers.get('authorization') ?? '',
    name: req.headers.get('username') ?? 'anonymous',
  }
  return { req, resHeaders, user }
}

export type Context = Awaited<ReturnType<typeof createContext>>

export const trpcContext = initTRPC.context<Context>().create()

export const procedure = trpcContext.procedure
