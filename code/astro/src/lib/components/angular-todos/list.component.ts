import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, type OnDestroy } from '@angular/core';
import { filter, map, switchMap, tap } from "rxjs";
import { getSubject } from "~/lib/common/util";
import { getTodos, setAllTodosCompleted } from "~/lib/services/todolist.service";
import { AddItemComponent } from "./addItem.component";
import { FooterComponent } from "./footer.component";
import { ItemComponent } from "./item.component";

@Component({
  selector: 'bb-list',
  standalone: true,
  imports: [
    CommonModule,
    AddItemComponent,
    ItemComponent,
    FooterComponent
  ],
  template: `
    <section class="todoapp">
      <bb-add-item />
      <section class="main">
        <input
          #checkboxToggleElem
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          (change)="checkSelectAllBtn$.next(true)"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          @for (item of (todos$ | async); track $index) {
            <bb-item [params]="item" />
          }
        </ul>
      </section>
      <bb-footer />
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnDestroy {
  @ViewChild('checkboxToggleElem') checkboxToggleElem?: ElementRef<HTMLInputElement>;

  checkSelectAllBtn$ = getSubject<boolean>();

  todos$ = getTodos();

  checkSelectAllSub = this.checkSelectAllBtn$
    .pipe(
      filter(() => !!this.checkboxToggleElem),
      switchMap(() => setAllTodosCompleted(this.checkboxToggleElem!.nativeElement.checked))
    )
    .subscribe();

  toggleCheckboxSub = this.todos$
    .pipe(
      map((todos) => {
        const total = todos.length;
        const selectedCount = todos.filter((a) => a.completed).length;
        if (total === 0) {
          return false;
        }
        return total === selectedCount;
      }),
      tap((isSelected) => {
        if (this.checkboxToggleElem?.nativeElement) {
          this.checkboxToggleElem.nativeElement.checked = isSelected;
        }
      })
    )
    .subscribe();

  ngOnDestroy(): void {
    this.toggleCheckboxSub.unsubscribe();
    this.checkSelectAllSub.unsubscribe();
  }
}
