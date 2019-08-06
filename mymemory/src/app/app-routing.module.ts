import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './member/login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule',canActivate: [AuthGuardService]},
  { path: 'reviewbook/list', loadChildren: './reviewbook/list/list.module#ListPageModule' },
  { path: 'reviewbook/create', loadChildren: './reviewbook/create/create.module#CreatePageModule' },
  { path: 'review/list/:id', loadChildren: './review/list/list.module#ListPageModule' },
  { path: 'review/write/:id', loadChildren: './review/write/write.module#WritePageModule' },
  { path: 'movie', loadChildren: './search/api/movie/movie.module#MoviePageModule' },
  { path: 'review/detail/:id', loadChildren: './review/detail/detail.module#DetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
