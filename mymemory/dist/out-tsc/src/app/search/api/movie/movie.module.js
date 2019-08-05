import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MoviePage } from './movie.page';
const routes = [
    {
        path: '',
        component: MoviePage
    }
];
let MoviePageModule = class MoviePageModule {
};
MoviePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [MoviePage]
    })
], MoviePageModule);
export { MoviePageModule };
//# sourceMappingURL=movie.module.js.map