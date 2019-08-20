import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ActorsPage } from './actors.page';
const routes = [
    {
        path: '',
        component: ActorsPage
    }
];
let ActorsPageModule = class ActorsPageModule {
};
ActorsPageModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            RouterModule.forChild(routes)
        ],
        declarations: [ActorsPage]
    })
], ActorsPageModule);
export { ActorsPageModule };
//# sourceMappingURL=actors.module.js.map