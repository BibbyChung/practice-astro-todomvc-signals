import { filter, map } from "rxjs";
import { getBehaviorSubject } from "../common/util";

export const isClient = () => {
  try {
    if (window) {
      return true;
    }
    return false;
  } catch (err) {
    return true;
  }
};

// window
export type windowType = Window & typeof globalThis;
const window$ = getBehaviorSubject<windowType | null>(null);
export const setWindow = (w: windowType) => { window$.next(w); };
export const getWindow = () =>
  window$.pipe(
    filter((a) => !!a),
    map((a) => a!)
  );

// title
const title$ = getBehaviorSubject<string | null>(null);
export const setTitle = (w: string) => { title$.next(w); };
export const getTitle = () =>
  title$.pipe(
    filter((a) => !!a),
    map((a) => a!)
  );
