import {AfterViewInit, ApplicationRef, Component, inject, NgZone} from '@angular/core';
import {ChildComponent} from './child.component';

@Component({
    selector: 'angular-runtime-performance-root',
    template: `
        <button (click)="noop()">Noop</button>
        <button id="some-btn">Another button</button>
        <button id="safe-btn">Safe button</button>
        <arp-child></arp-child>
    `,
    styles: [``],
    imports: [
        ChildComponent
    ],
    standalone: true
})
export class AppComponent implements AfterViewInit {

    #applicationRef = inject(ApplicationRef);
    #ngZone = inject(NgZone);

    constructor() {
        const originalTick = this.#applicationRef.tick;

        this.#applicationRef.tick = function () {
            const windowPerformance = window.performance;
            const before = windowPerformance.now();
            originalTick.apply(this, []);
            const after = windowPerformance.now();
            const time = after - before;
            console.log('CD RUN:', time);
        }
    }

    ngAfterViewInit(): void {
        /*
        Triggers change detection
         */
        const root = document.getElementsByTagName('arp-child')[0];
        root.parentNode?.removeChild(root);

        /*
        Still triggers change detection
         */
        const button: any = document.querySelector('#some-btn');
        button.addEventListener('click', () => {console.log('%cnot safe button clicked, change detection is triggered', 'font-size:40px; color: red')});

        this.#ngZone.runOutsideAngular(() => {
            const button: any = document.querySelector('#safe-btn');
            button.addEventListener('click', () => {console.log('%csafe button clicked, change detection is not triggered', 'font-size:40px; color:green')});
        });
    }

    noop() {
    }
}
