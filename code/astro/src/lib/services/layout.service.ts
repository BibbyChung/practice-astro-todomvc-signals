import type { AstroGlobal } from 'astro'
import { filter, map } from 'rxjs'
import { getBehaviorSubject } from '../common/util'

export const getIsBrowser = () => {
  try {
    if (typeof window !== 'undefined') {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

// window
export type windowType = Window & typeof globalThis
const window$ = getBehaviorSubject<windowType | null>(null)
export const setWindow = (w: windowType) => {
  window$.next(w)
}
export const getWindow = () =>
  window$.pipe(
    filter((a) => !!a),
    map((a) => a!)
  )

// astro context
export const getAstroContext = (astro: AstroGlobal) => {
  const context = {
    req: astro.request,
    resHeaders: astro.response.headers,
    user: { name: '', token: '' },
  }
  return context
}

// title
const title$ = getBehaviorSubject<string | null>(null)
export const setTitle = (w: string) => {
  title$.next(w)
}
export const getTitle = () =>
  title$.pipe(
    filter((a) => !!a),
    map((a) => a!)
  )
