import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
let HomePage = class HomePage {
    constructor(movieService) {
        this.movieService = movieService;
    }
    search() {
        console.log('메소드 실행');
        this.results = this.movieService.searchCredit();
        console.log(this.results);
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