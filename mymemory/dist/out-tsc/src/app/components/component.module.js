import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RatingComponent } from './rating/rating.component';
import { CommonModule } from '@angular/common';
let ComponentsModule = class ComponentsModule {
};
ComponentsModule = tslib_1.__decorate([
    NgModule({
        declarations: [RatingComponent],
        imports: [CommonModule],
        exports: [RatingComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], ComponentsModule);
export { ComponentsModule };
//# sourceMappingURL=component.module.js.map