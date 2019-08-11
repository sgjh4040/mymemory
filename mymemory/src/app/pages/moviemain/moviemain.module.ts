import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MoviemainPage } from './moviemain.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MoviemainPage,
    children: [
      {
        path: 'movie',
        loadChildren: '../../info/movies/movies.module#MoviesPageModule'
      },
      {
        path: 'actors',
        loadChildren: '../../info/actors/actors.module#ActorsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/movie',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoviemainPage]
})
export class MoviemainPageModule {}
