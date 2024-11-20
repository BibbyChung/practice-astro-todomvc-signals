import { z } from 'zod'
import { getUUID } from '~/lib/common/util'
import { procedure } from './_context'
import type { HandleOptsType } from './_init'

export type todoType = {
  id: string
  title: string
  completed: boolean
}

let todos: todoType[] = [
  {
    id: 'f33f9cd8-4941-4535-bef9-06200b918541',
    title: 'abc',
    completed: false,
  },
]

export const getAllInput = z.void()
const getAllHandle = (opts: HandleOptsType<typeof getAllInput>) => todos

export const addInput = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
})
const addHandle = (opts: HandleOptsType<typeof addInput>) => {
  opts.input.id = getUUID()
  todos.push(opts.input)
}

export const delInput = z.object({
  id: z.string(),
})
const delHandle = (opts: HandleOptsType<typeof delInput>) => {
  todos = todos.filter((a) => a.id !== opts.input.id)
}

export const updateInput = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
})
const updateHandle = (opts: HandleOptsType<typeof updateInput>) => {
  const item = todos.find((a) => a.id === opts.input.id)
  if (item) {
    item.completed = opts.input.completed
    item.title = opts.input.title
  }
}

export const todosRouter = {
  getAll: procedure.query(getAllHandle),
  add: procedure.input(addInput).mutation(addHandle),
  del: procedure.input(delInput).mutation(delHandle),
  update: procedure.input(updateInput).mutation(updateHandle),
}
