import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
const routes = [
    {
        path: '',
        component: MainPage
    }
];
let MainPageModule = class MainPageModule {
};
MainPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [MainPage]
    })
], MainPageModule);
export { MainPageModule };
//# sourceMappingURL=main.module.js.map