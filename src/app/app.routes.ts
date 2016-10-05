// Angular
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './home.module#HomeModule' },
    { path: 'home', loadChildren: './home.module#HomeModule' }
];

export const routing = RouterModule.forRoot(routes);
