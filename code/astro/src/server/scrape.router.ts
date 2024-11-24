import { z } from 'zod'
import { procedure } from './_context'
import type { HandleOptsType } from './_init'
import { getPostItems } from '~/lib/services/scrape.service'

export const getCategoryInput = z.string()
const getPostItemsHandle = (opts: HandleOptsType<typeof getCategoryInput>) => {
  return getPostItems(opts.input)
}

export const scrapeRouter = {
  getPostsItems: procedure.input(getCategoryInput).query(getPostItemsHandle),
}
