import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController, NavController } from '@ionic/angular';
import { MoviePage } from 'src/app/search/api/movie/movie.page';
let WritePage = class WritePage {
    constructor(activateRoute, movieService, modalController, router, nav) {
        this.activateRoute = activateRoute;
        this.movieService = movieService;
        this.modalController = modalController;
        this.router = router;
        this.nav = nav;
    }
    ngOnInit() {
        this.list_id = this.activateRoute.snapshot.paramMap.get('id');
        this.reviewForm = new FormGroup({
            title: new FormControl('', [Validators.required]),
            writer: new FormControl(''),
            reviewlist_id: new FormControl(''),
            release_date: new FormControl(''),
            overview: new FormControl(''),
            genre: new FormControl(''),
            watch_date: new FormControl(''),
            poster_path: new FormControl(''),
            rating: new FormControl(''),
            famouse_line: new FormControl(''),
            review: new FormControl(''),
            tags: new FormControl(''),
        });
    }
    ;
    onSubmit() {
        let that = this;
        this.reviewForm.value.reviewlist_id = this.list_id;
        console.log('저장내용', this.reviewForm.value);
        this.movieService.writeReview(this.reviewForm.value).subscribe();
        //서버 저장 시간 텀을 두기위해.
        setTimeout(function () {
            that.router.navigateByUrl(`/review/list/${that.list_id}`);
        }, 500);
    }
    ;
    openSearchMovieModal() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: MoviePage,
            });
            modal.onDidDismiss()
                .then((data) => {
                console.log(data['data']);
                console.log(typeof data['data']);
                this.movie = data['data'];
            });
            return yield modal.present();
        });
    }
    ;
};
WritePage = tslib_1.__decorate([
    Component({
        selector: 'app-write',
        templateUrl: './write.page.html',
        styleUrls: ['./write.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute, MovieService, ModalController, Router, NavController])
], WritePage);
export { WritePage };
//# sourceMappingURL=write.page.js.map