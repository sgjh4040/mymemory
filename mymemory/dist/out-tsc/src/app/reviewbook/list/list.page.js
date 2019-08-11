import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
let ListPage = class ListPage {
    constructor(movieService, route) {
        this.movieService = movieService;
        this.editButton = false;
        route.params.subscribe(val => {
            this.movieService.getreviewList().subscribe(res => {
                this.list = res;
            });
        });
    }
    ;
    ngOnInit() {
        console.log("ngOninit");
        this.movieService.getreviewList().subscribe(res => {
            this.list = res;
        });
    }
};
ListPage = tslib_1.__decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.page.html',
        styleUrls: ['./list.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [MovieService, ActivatedRoute])
], ListPage);
export { ListPage };
//# sourceMappingURL=list.page.js.map