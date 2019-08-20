import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetailmoviePage } from './detailmovie.page';
const routes = [
    {
        path: '',
        component: DetailmoviePage
    }
];
let DetailmoviePageModule = class DetailmoviePageModule {
};
DetailmoviePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [DetailmoviePage]
    })
], DetailmoviePageModule);
export { DetailmoviePageModule };
//# sourceMappingURL=detailmovie.module.js.map