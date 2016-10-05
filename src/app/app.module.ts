import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { App }  from './app';
import { routing }  from './app.routes';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    UniversalModule,
    routing
  ],
  declarations: [
    App
  ],
  providers: [
    
  ]
})
export class AppModule { }
