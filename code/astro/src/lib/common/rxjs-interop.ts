import { computed, effect, signal, untracked, type Signal } from '@preact/signals-core'
import { Observable, ReplaySubject, type Subscribable } from 'rxjs'

type State<T> = NoValueState | ValueState<T> | ErrorState

interface NoValueState {
  kind: StateKind.NoValue
}

interface ValueState<T> {
  kind: StateKind.Value
  value: T
}

interface ErrorState {
  kind: StateKind.Error
  error: unknown
}

export interface ToSignalOptions {
  initialValue?: unknown
  rejectErrors?: boolean
}

const enum StateKind {
  NoValue,
  Value,
  Error,
}

export function toSignal<T, U = undefined>(
  source: Observable<T> | Subscribable<T>,
  options?: ToSignalOptions & { initialValue?: U }
): [Signal<T | U | null | undefined>, () => void] {
  const state: Signal<State<T | U>> = signal<State<T | U>>({
    kind: StateKind.Value,
    value: options?.initialValue as U,
  })
  const sub = source.subscribe({
    next: (value) => {
      state.value = { kind: StateKind.Value, value }
    },
    error: (error) => {
      if (options?.rejectErrors) {
        // Kick the error back to RxJS. It will be caught and rethrown in a macrotask, which causes
        // the error to end up as an uncaught exception.
        throw error
      }
      state.value = { kind: StateKind.Error, error }
    },
  })

  const disposeFunc = () => {
    sub.unsubscribe()
    console.log('dispose toSignal...')
  }

  return [
    computed(() => {
      const current = state.value
      switch (current.kind) {
        case StateKind.Value:
          return current.value
        case StateKind.Error:
          throw current.error
      }
    }),
    disposeFunc,
  ]
}

export function toObservable<T>(source: Signal<T>): [Observable<T>, () => void] {
  const subject = new ReplaySubject<T>(1)

  const dispose = effect(() => {
    let value: T
    try {
      value = source.value
    } catch (err) {
      untracked(() => subject.error(err))
      return
    }
    untracked(() => subject.next(value))
  })

  const disposeFunc = () => {
    dispose()
    subject.complete()
    console.log('dispose toObservable...')
  }

  return [subject.asObservable(), disposeFunc]
}
