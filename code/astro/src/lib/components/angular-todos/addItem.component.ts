import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, type AfterViewInit, type OnDestroy } from '@angular/core';
import { tap } from "rxjs";
import { getSubject } from "~/lib/common/util";
import { addTodo } from "~/lib/services/todolist.service";

@Component({
  selector: 'bb-add-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <header class="header">
      <h1>todos</h1>
      <form (submit)="submitBtn$.next(true);$event.preventDefault();">
        <input
          #inputRef
          class="new-todo"
          placeholder="What needs to be done?"
          [autofocus]="true"
          />
      </form>
    </header>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

  submitBtn$ = getSubject<boolean>();

  submitSub = this.submitBtn$
    .pipe(
      tap(() => {
        const v: string = this.inputRef?.nativeElement.value ?? "";
        if (v !== "") {
          addTodo(v ?? "");
          this.inputRef!.nativeElement.value = "";
        }
      })
    )
    .subscribe();

  ngAfterViewInit(): void {
    // https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element
    this.inputRef?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.submitSub.unsubscribe();
  }
}
