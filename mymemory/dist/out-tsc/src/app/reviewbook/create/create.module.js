import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreatePage } from './create.page';
const routes = [
    {
        path: '',
        component: CreatePage
    }
];
let CreatePageModule = class CreatePageModule {
};
CreatePageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [CreatePage]
    })
], CreatePageModule);
export { CreatePageModule };
//# sourceMappingURL=create.module.js.map