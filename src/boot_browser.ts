// the polyfills must be the first thing imported
import './polyfills';
import 'angular2-universal-polyfills';
// import 'angular2-universal-polyfills/browser';

// Angular 2
import { enableProdMode} from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';

// enable prod for faster renders
enableProdMode();

import { MainModule } from './main.browser';

const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {

  platformRef.bootstrapModule(MainModule);

});

// import './polyfills';

// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { App } from './app/app';

// bootstrap(App, []);
