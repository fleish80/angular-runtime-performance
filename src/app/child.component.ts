import {Component, DoCheck} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'arp-child',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>child works!</p> `,
  styles: [],
})
export class ChildComponent implements DoCheck {
  ngDoCheck(): void {
    console.log('ChildComponent');
  }
}
