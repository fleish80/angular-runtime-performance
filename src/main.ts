import {bootstrapApplication, enableDebugTools} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {ApplicationRef} from '@angular/core';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent)
    .then(moduleRef => {
        const applicationRef = moduleRef.injector.get(ApplicationRef);
        const componentRef = applicationRef.components[0];
        enableDebugTools(componentRef);//this line enable us to use ng.profiler.timeChangeDetection() in command line
    })
    .catch((err) => console.error(err));
