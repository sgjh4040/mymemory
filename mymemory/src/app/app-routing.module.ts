import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'menu/main', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './member/login/login.module#LoginPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule'},
  { path: 'reviewbook/list', loadChildren: './reviewbook/list/list.module#ListPageModule',canActivate: [AuthGuardService] },
  { path: 'reviewbook/create', loadChildren: './reviewbook/create/create.module#CreatePageModule' },
  { path: 'review/list/:id', loadChildren: './review/list/list.module#ListPageModule' },
  { path: 'review/write/:id', loadChildren: './review/write/write.module#WritePageModule' },
  { path: 'movie', loadChildren: './search/api/movie/movie.module#MoviePageModule' },
  { path: 'review/detail/:id', loadChildren: './review/detail/detail.module#DetailPageModule' },
  { path: 'search', loadChildren: './search/review/movie/movie.module#MoviePageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'actors', loadChildren: './info/actors/actors.module#ActorsPageModule' },
  { path: 'detailmovie/:id', loadChildren: './info/detailmovie/detailmovie.module#DetailmoviePageModule' },
  { path: 'mypage', loadChildren: './member/mypage/mypage.module#MypagePageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'sign-up', loadChildren: './member/sign-up/sign-up.module#SignUpPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
