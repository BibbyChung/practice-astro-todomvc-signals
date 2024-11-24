import type { ZodTypeAny, z } from 'zod'
import { trpcContext, type Context } from './_context'
import { scrapeRouter } from './scrape.router'
import { todosRouter } from './todos.router'
import { userRouter } from './user.router'

export type AppRouterType = typeof appRouter

export type HandleOptsType<T extends ZodTypeAny> = {
  ctx: Context
  input: z.infer<T>
}

export const appRouter = trpcContext.router({
  user: trpcContext.router(userRouter),
  todos: trpcContext.router(todosRouter),
  scrape: trpcContext.router(scrapeRouter),
})

export const appCaller = trpcContext.createCallerFactory(appRouter)
