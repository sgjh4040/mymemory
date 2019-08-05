import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
let ListPage = class ListPage {
    constructor(movieService, route) {
        this.movieService = movieService;
        route.params.subscribe(val => {
            console.log('aaaa');
            this.movieService.getreviewList().subscribe(res => {
                this.list = res;
                console.log('리뷰리스트:', this.list);
            });
        });
    }
    ngOnInit() {
        this.movieService.getreviewList().subscribe(res => {
            this.list = res;
            console.log('리뷰리스트:', this.list);
        });
    }
    ngDoCheck() {
        console.log('ngDoCheck');
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