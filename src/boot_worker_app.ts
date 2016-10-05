// import './polyfills';

// import { bootstrapWorkerApp } from '@angular/platform-browser-dynamic';
// import { App } from './app/app';

// bootstrapWorkerApp(App, []);

import './polyfills';

import { NgModule } from '@angular/core';
import { WorkerAppModule } from '@angular/platform-webworker';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';

import { App } from './app/app';
import { AppModule } from './app/app.module';

@NgModule({
    imports: [
        WorkerAppModule,
        AppModule
    ], 
    bootstrap: [ App ]
})
class MainModule {
}

//export function main() {
  platformWorkerAppDynamic().bootstrapModule(MainModule);
//}