import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var COLORS;
(function (COLORS) {
    COLORS["GREY"] = "#E0E0E0";
    COLORS["YELLOW"] = "#FFCA28";
})(COLORS || (COLORS = {}));
let RatingComponent = class RatingComponent {
    constructor() {
        this.ratingChange = new EventEmitter();
    }
    rate(index) {
        this.rating = index;
        this.ratingChange.emit(this.rating);
    }
    getColor(index) {
        if (this.isAboveRating(index)) {
            return COLORS.GREY;
        }
        switch (this.rating) {
            case 1:
            case 2:
                return COLORS.YELLOW;
            case 3:
                return COLORS.YELLOW;
            case 4:
            case 5:
                return COLORS.YELLOW;
            default:
                return COLORS.GREY;
        }
    }
    isAboveRating(index) {
        return index > this.rating;
    }
    ngOnInit() { }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], RatingComponent.prototype, "rating", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], RatingComponent.prototype, "ratingChange", void 0);
RatingComponent = tslib_1.__decorate([
    Component({
        selector: 'rating',
        templateUrl: './rating.component.html',
        styleUrls: ['./rating.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], RatingComponent);
export { RatingComponent };
//# sourceMappingURL=rating.component.js.map