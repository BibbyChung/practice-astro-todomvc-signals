import { from, useObservable } from "@vueuse/rxjs";
import { Observable, map } from 'rxjs';
import type { Ref } from "vue";

export function toRef<T>(
  source: Observable<T>
): Ref<T | undefined> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useObservable(source.pipe(
    map((value) => {
      let v: unknown;
      try {
        if (typeof value === 'object' && value !== null) {
          v = Array.isArray(value) ? [...value] : { ...value };
        } else {
          v = value;
        }
      } catch (err) {
        v = value;
      }
      return v as T;
    })
  ));
}

export function toObservable<T>(
  source: Ref<T>
): Observable<T> {
  return from(source);
}
