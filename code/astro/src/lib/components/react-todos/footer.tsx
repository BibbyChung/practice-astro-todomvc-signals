import { useSignals } from '@preact/signals-react/runtime'
import { useEffect } from 'react'
import { map, startWith, switchMap, tap } from 'rxjs'
import { toSignal, useSubject } from '~/lib/common/rxjs-interop-react'
import {
  getTodos,
  getTodosFilter,
  removeAllTodosCompleted,
  setTodosFilter,
  type todosFilterType,
} from '~/lib/services/todolist.service'

export default function Footer() {
  useSignals()
  const isReady$ = useSubject<boolean>()
  const removeAllTodosBtn$ = useSubject<boolean>()
  const setTodosFilterBtn$ = useSubject<todosFilterType>()
  const todos$ = isReady$.pipe(
    switchMap(() => getTodos()),
    startWith([])
  )

  const isShowClearCompletedSig = toSignal(
    todos$.pipe(
      map((todos) => {
        const completedCount = todos.filter((a) => a.completed).length
        return completedCount !== 0
      })
    )
  )

  const uncompletedCountSig = toSignal(
    todos$.pipe(map((todos) => todos.filter((a) => !a.completed).length))
  )

  const todoFilterSig = toSignal(getTodosFilter())

  useEffect(() => {
    const removeAllTodosSub = removeAllTodosBtn$
      .pipe(switchMap(() => removeAllTodosCompleted()))
      .subscribe()

    const setTodosFilterSub = setTodosFilterBtn$
      .pipe(tap((type) => setTodosFilter(type)))
      .subscribe()

    isReady$.next(true)

    return () => {
      removeAllTodosSub.unsubscribe()
      setTodosFilterSub.unsubscribe()
    }
  }, [])

  return (
    <footer className='footer'>
      <span>
        {uncompletedCountSig.value === 1
          ? '1 uncompleted item left'
          : `${uncompletedCountSig.value} uncompleted items left`}
      </span>
      <ul className='filters'>
        <li>
          <a
            onClick={(e) => {
              setTodosFilterBtn$.next('all')
              e.preventDefault()
            }}
            href='#/'
            className={todoFilterSig.value === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              setTodosFilterBtn$.next('active')
              e.preventDefault()
            }}
            href='#/'
            className={todoFilterSig.value === 'active' ? 'selected' : ''}
          >
            Active
          </a>
        </li>
        <li>
          <a
            onClick={(e) => {
              setTodosFilterBtn$.next('completed')
              e.preventDefault()
            }}
            href='#/'
            className={todoFilterSig.value === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>
      <div>
        {isShowClearCompletedSig.value ? (
          <button
            onClick={(e) => {
              removeAllTodosBtn$.next(true)
            }}
            className='clear-completed'
          >
            Clear completed
          </button>
        ) : (
          ''
        )}
      </div>
    </footer>
  )
}
