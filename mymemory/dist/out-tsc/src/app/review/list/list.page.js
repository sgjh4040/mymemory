import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
let ListPage = class ListPage {
    constructor(activateRoute, movieService, route, router) {
        this.activateRoute = activateRoute;
        this.movieService = movieService;
        this.router = router;
        this.list = null;
        route.params.subscribe(val => {
            console.log('bbbb');
            this.list_id = this.activateRoute.snapshot.paramMap.get('id');
            this.movieService.getreview(this.list_id).subscribe(res => {
                this.list = res;
                console.log('this.list', this.list);
            });
        });
    }
    ngOnInit() {
    }
    godetailreview(id) {
        this.router.navigate(['review/detail', id]);
    }
};
ListPage = tslib_1.__decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.page.html',
        styleUrls: ['./list.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MovieService, ActivatedRoute, Router])
], ListPage);
export { ListPage };
//# sourceMappingURL=list.page.js.map