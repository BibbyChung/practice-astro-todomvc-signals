import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef, inject, type OnDestroy, type OnInit } from '@angular/core';
import { filter, tap } from "rxjs";
import { getSubject } from "~/lib/common/util";
import { delTodo, updateTodo, type todoType } from "~/lib/services/todolist.service";

@Component({
  selector: 'bb-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <ng-template #tpl>
      <li [ngClass]="{'completed': params?.completed}">
        <div class="view">
          <input
            #inputElem
            class="toggle"
            type="checkbox"
            [checked]="params?.completed"
            (change)="updateItemBtn$.next(true)"
          />
          <label>{{params?.title}}</label>
          <button
            (click)="destroyBtn$.next(true)"
            class="destroy"
          ></button>
        </div>
      </li>
    </ng-template>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit, OnDestroy {
  @ViewChild('tpl', { static: true }) tpl?: TemplateRef<HTMLElement>;
  viewContainerRef = inject(ViewContainerRef);

  @Input() params?: todoType;
  @ViewChild('inputElem') inputElem?: ElementRef<HTMLInputElement>;

  updateItemBtn$ = getSubject<boolean>();
  destroyBtn$ = getSubject<boolean>();

  updateItemSub = this.updateItemBtn$
    .pipe(
      filter(() => !!this.inputElem),
      tap(() => {
        const newObj = JSON.parse(JSON.stringify(this.params)) as todoType;
        newObj.completed = this.inputElem!.nativeElement.checked;
        updateTodo(newObj);
      })
    )
    .subscribe();

  destroySub = this.destroyBtn$
    .pipe(tap(() => delTodo(this.params!.id)))
    .subscribe();

  ngOnInit(): void {
    // remove angular component wrap tag (trick)
    this.viewContainerRef.createEmbeddedView(this.tpl!);
    this.viewContainerRef.element.nativeElement.remove();
  }

  ngOnDestroy(): void {
    this.updateItemSub.unsubscribe();
    this.destroySub.unsubscribe();
  }
}
