import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WritePage } from './write.page';
const routes = [
    {
        path: '',
        component: WritePage
    }
];
let WritePageModule = class WritePageModule {
};
WritePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [WritePage]
    })
], WritePageModule);
export { WritePageModule };
//# sourceMappingURL=write.module.js.map