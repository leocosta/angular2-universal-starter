import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { App } from './app/app';
import { AppModule } from './app/app.module';

@NgModule({
  bootstrap: [ App ],
  imports: [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    AppModule,
  ],
  providers: [

  ]
})
export class MainModule {

}
