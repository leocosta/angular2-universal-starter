
import { Router, Request, Response } from 'express';
//import { provide } from '@angular/core';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import {
  REQUEST_URL,
  NODE_LOCATION_PROVIDERS,
  ORIGIN_URL,
  platformUniversalDynamic,
  UniversalModule,
  NodeModule,
  NodeHttpModule,
  NodeJsonpModule,
  platformNodeDynamic,

  // selectorResolver,
  // selectorRegExpFactory,
  // renderToStringWithPreboot,
  // Bootloader
} from 'angular2-universal';

//import { App } from '../app/app';
import { MainModule } from '../main.node';
import { App } from '../app/app';
import { AppModule } from '../app/app.module';

export const platform = platformNodeDynamic();

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function reduceScripts(content, src) {
  return `${content}<script type="text/javascript" src="${src}"></script>`;
}

function getBaseUrlFromRequest(request: Request): string {
  return `${request.protocol}://${request.get('HOST')}/`;
}

const WORKER_SCRIPTS  = [`${VENDOR_NAME}.js`, `${WORKER_NAME}.js`].reduce(reduceScripts, '');
const BROWSER_SCRIPTS = [`${VENDOR_NAME}.js`, `${BROWSER_NAME}.js`].reduce(reduceScripts, '');

const HTML_FILE = require('./ng.html');

// export function renderComponent(html, component, providers, prebootOptions) {
//   return renderToStringWithPreboot(component, providers, prebootOptions).then((serializedCmp) => {
//     const selector: string = selectorResolver(component);

//     return html.replace(selectorRegExpFactory(selector), serializedCmp);
//   });
// }

// if (!global['_bootloader']) {
//   global['_bootloader'] = new Bootloader({
//     template: HTML_FILE,
//     platformProviders: [
//       ...NODE_LOCATION_PROVIDERS,
//       provide(APP_BASE_HREF, { useValue: '/' }),
//     ]
//   });
// }

const bootloader = global['_bootloader'];
const router = Router();

/**
 * Angular2 application
 */
router.get('/*', (req: Request, res: Response, next: Function) => {
  return Promise.resolve()
    // .then(() => {
    //   if (HAS_SS) {
    //     return bootloader.serializeApplication({
    //       directives: [App],
    //       preboot: PREBOOT,
    //       providers: [
    //         provide(REQUEST_URL,   { useValue: req.originalUrl }),
    //         provide(ORIGIN_URL,    { useValue: getBaseUrlFromRequest(req) })
    //       ]
    //     });
    //   }

    //   return HTML_FILE;
    // })
    .then(() => {
      return main(HTML_FILE, {id: s4(), time: true})
        .then((html: string) => {
          // console.log('\n -- serializeModule FINISHED --');
          return html;
        })
    })
    .then((rawContent) => {
      const scripts = HAS_WW ? WORKER_SCRIPTS : BROWSER_SCRIPTS;
      const content = rawContent.replace('</body>', scripts + '</body>');

      return res.send(content);
    })
    .catch(error => next(error));
});




// We want to export the entire main function to be called from Node
export function main(document, config?: any) {

  // Universal Container (aka Module)
  @NgModule({
    // These are identical to the Browser NgModule (in app.browser.module.ts)
    bootstrap    : [ App ],
 
    // As opposed to the normal "BrowserModule, HttpModule, JsonpModule" imports
    // in our Browser NgModule (found in app.browser.module.ts)
    // Here we need to import Node specific modules for Universal
    imports: [


      // NodeModule from "@angular/universal" allows us to provide a config object
      NodeModule.withConfig({
        // Our "document" which we need to pass in from Node
        // (first param of this main function)
        document: document,
        originUrl: 'http://localhost:3000',
        baseUrl: '/',
        requestUrl: '/',
        // Preboot [Transfer state between Server & Client]
        // More info can be found at: https://github.com/angular/preboot#options
        preboot: {
          appRoot : [ 'app' ], // selector(s) for app(s) on the page
          uglify  : true       // uglify preboot code
        },
      }),
      // Other important Modules for Universal
      NodeHttpModule, // Universal Http
      NodeJsonpModule, // Universal JSONP

      // App Modules
      AppModule
    ],

    // providers: [
    //   appRoutingProviders,
    //   DialogService
    // ]
  })
  class MainModule { }

  // -----------------------
  // On the browser:
  // platformBrowserDynamic().bootstrapModule(MainModule);
  // But in Node, we don't "bootstrap" our application, we want to Serialize it!

  return platformNodeDynamic().serializeModule(MainModule, config);
  // serializeModule returns a promise
  // (just like bootstrapModule on the browser does)

};


export { router };



// import { Router, Request, Response } from 'express';
// import { provide } from '@angular/core';
// import { APP_BASE_HREF } from '@angular/common';
// import {
//   REQUEST_URL,
//   NODE_LOCATION_PROVIDERS,
//   ORIGIN_URL,
//   selectorResolver,
//   selectorRegExpFactory,
//   renderToStringWithPreboot,
//   Bootloader
// } from 'angular2-universal';

// import { App } from '../app/app';

// function reduceScripts(content, src) {
//   return `${content}<script type="text/javascript" src="${src}"></script>`;
// }

// function getBaseUrlFromRequest(request: Request): string {
//   return `${request.protocol}://${request.get('HOST')}/`;
// }

// const WORKER_SCRIPTS  = [`${VENDOR_NAME}.js`, `${WORKER_NAME}.js`].reduce(reduceScripts, '');
// const BROWSER_SCRIPTS = [`${VENDOR_NAME}.js`, `${BROWSER_NAME}.js`].reduce(reduceScripts, '');

// const HTML_FILE = require('./ng.html');

// export function renderComponent(html, component, providers, prebootOptions) {
//   return renderToStringWithPreboot(component, providers, prebootOptions).then((serializedCmp) => {
//     const selector: string = selectorResolver(component);

//     return html.replace(selectorRegExpFactory(selector), serializedCmp);
//   });
// }

// if (!global['_bootloader']) {
//   global['_bootloader'] = new Bootloader({
//     template: HTML_FILE,
//     platformProviders: [
//       ...NODE_LOCATION_PROVIDERS,
//       provide(APP_BASE_HREF, { useValue: '/' }),
//     ]
//   });
// }

// const bootloader = global['_bootloader'];

// const router = Router();

// /**
//  * Angular2 application
//  */
// router.get('/*', (req: Request, res: Response, next: Function) => {
//   return Promise.resolve()
//     .then(() => {
//       if (HAS_SS) {
//         return bootloader.serializeApplication({
//           directives: [App],
//           preboot: PREBOOT,
//           providers: [
//             provide(REQUEST_URL,   { useValue: req.originalUrl }),
//             provide(ORIGIN_URL,    { useValue: getBaseUrlFromRequest(req) })
//           ]
//         });
//       }

//       return HTML_FILE;
//     })
//     .then((rawContent) => {
//       const scripts = HAS_WW ? WORKER_SCRIPTS : BROWSER_SCRIPTS;
//       const content = rawContent.replace('</body>', scripts + '</body>');

//       return res.send(content);
//     })
//     .catch(error => next(error));
// });

// export { router };
