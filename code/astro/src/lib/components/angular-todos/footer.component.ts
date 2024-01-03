import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, type OnDestroy } from '@angular/core';
import { map, switchMap, tap } from "rxjs";
import { getSubject } from "~/lib/common/util";
import { getTodos, getTodosFilter, removeAllTodosCompleted, setTodosFilter, type todosFilterType } from "~/lib/services/todolist.service";

@Component({
  selector: 'bb-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <footer class="footer">
      <span class="todo-count">
        @if ((uncompletedCount$ | async) === 1) {
          1 uncompleted item left
        }
        @else {
          {{uncompletedCount$ | async}} uncompleted items left
        }
      </span>
      <ul class="filters">
        <li>
          <a
            (click)="setTodosFilterBtn$.next('all'); $event.preventDefault()"
            href="#/"
            [ngClass]="{'selected': (todoFilter$|async) === 'all'}">All</a
          >
        </li>
        <li>
          <a
            (click)="setTodosFilterBtn$.next('active'); $event.preventDefault()"
            href="#/"
            [ngClass]="{'selected': (todoFilter$|async) === 'active'}">Active</a
          >
        </li>
        <li>
          <a
            (click)="setTodosFilterBtn$.next('completed'); $event.preventDefault()"
            href="#/"
            [ngClass]="{'selected': (todoFilter$|async) === 'completed'}">Completed</a
          >
        </li>
      </ul>
      <div>
        @if (isShowClearCompleted$|async){
          <button
            (click)="removeAllTodosBtn$.next(true)"
            class="clear-completed"
          >
            Clear completed
          </button>
        }
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnDestroy {
  removeAllTodosBtn$ = getSubject<boolean>();
  setTodosFilterBtn$ = getSubject<todosFilterType>();

  isShowClearCompleted$ = getTodos().pipe(
    map((todos) => {
      const completedCount = todos.filter((a) => a.completed).length;
      return completedCount !== 0;
    })
  );

  uncompletedCount$ = getTodos().pipe(
    map((todos) => todos.filter((a) => !a.completed).length)
  );

  todoFilter$ = getTodosFilter();

  setTodosFilterSub = this.setTodosFilterBtn$
    .pipe(tap((type) => setTodosFilter(type)))
    .subscribe();

  removeAllTodosSub = this.removeAllTodosBtn$
    .pipe(switchMap(() => removeAllTodosCompleted()))
    .subscribe();

  ngOnDestroy(): void {
    this.removeAllTodosSub.unsubscribe();
    this.setTodosFilterSub.unsubscribe();
  }
}
