import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
  <p>
    hello-world works!
  </p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloWorldComponent { }
