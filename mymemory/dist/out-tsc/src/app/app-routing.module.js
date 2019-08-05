import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
    { path: 'login', loadChildren: './member/login/login.module#LoginPageModule' },
    { path: 'main', loadChildren: './pages/main/main.module#MainPageModule', canActivate: [AuthGuardService] },
    { path: 'reviewbook/list', loadChildren: './reviewbook/list/list.module#ListPageModule' },
    { path: 'reviewbook/create', loadChildren: './reviewbook/create/create.module#CreatePageModule' },
    { path: 'review/list/:id', loadChildren: './review/list/list.module#ListPageModule' },
    { path: 'review/write/:id', loadChildren: './review/write/write.module#WritePageModule' },
    { path: 'movie', loadChildren: './search/api/movie/movie.module#MoviePageModule' },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, })
        ],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map