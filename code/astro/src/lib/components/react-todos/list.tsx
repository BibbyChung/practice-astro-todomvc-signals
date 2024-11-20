import { useSignals } from '@preact/signals-react/runtime'
import { useEffect, useRef } from 'react'
import { filter, map, switchMap, take, tap } from 'rxjs'
import { toSignal, useSubject } from '~/lib/common/rxjs-interop-react'
import { getTodos, setAllTodosCompleted } from '~/lib/services/todolist.service'
import AddItem from './addItem'
import Footer from './footer'
import Item from './item'

export default function TodoList() {
  useSignals()
  const checkboxToggleRef = useRef<HTMLInputElement>(null)
  const isReady$ = useSubject<boolean>()
  const checkSelectAllBtn$ = useSubject<boolean>()
  const todosSig = toSignal(getTodos())

  useEffect(() => {
    isReady$.next(true)

    const toggleCheckboxSub = isReady$
      .pipe(
        filter((a) => a),
        switchMap(() => getTodos()),
        map((todos) => {
          const total = todos.length
          const selectedCount = todos.filter((a) => a.completed).length
          if (total === 0) {
            return false
          }
          return total === selectedCount
        }),
        tap((isSelected) => {
          if (checkboxToggleRef.current) {
            checkboxToggleRef.current.checked = isSelected
          }
        })
      )
      .subscribe()

    const checkSelectAllSub = checkSelectAllBtn$
      .pipe(
        take(1),
        switchMap(() => setAllTodosCompleted(checkboxToggleRef.current?.checked ?? false))
      )
      .subscribe()

    return () => {
      toggleCheckboxSub.unsubscribe()
      checkSelectAllSub.unsubscribe()
    }
  }, [])

  return (
    <section className='todoapp'>
      <AddItem />
      <section className='main'>
        <input
          id='toggle-all'
          className='toggle-all'
          type='checkbox'
          onChange={(e) => {
            checkSelectAllBtn$.next(true)
            // e.preventDefault();
          }}
          ref={checkboxToggleRef}
        />
        <label htmlFor='toggle-all'>Mark all as complete</label>
        <ul className='todo-list'>
          {todosSig.value?.map((item, i) => <Item key={item.id} {...item} />)}
        </ul>
      </section>

      <Footer />
      {/* {JSON.stringify(todosSig.value)} */}
    </section>
  )
}
