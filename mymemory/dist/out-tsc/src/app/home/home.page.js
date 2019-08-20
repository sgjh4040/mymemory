import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { from } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
let HomePage = class HomePage {
    constructor(movieService) {
        this.movieService = movieService;
        this.myArray = [1, 2, 3, 4, 5];
    }
    ngOnInit() {
        const obserable$ = from(this.myArray);
        this.subscription = obserable$.pipe(map(item => item * 2), filter(res => res > 4), tap(item => console.log(item))).subscribe();
    }
};
HomePage = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: 'home.page.html',
        styleUrls: ['home.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [MovieService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.page.js.map