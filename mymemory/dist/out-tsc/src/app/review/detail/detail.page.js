import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ShareService } from 'src/app/services/share.service';
let DetailPage = class DetailPage {
    constructor(alertController, activateRoute, movieService, nav, router, loadingController, shareService) {
        this.alertController = alertController;
        this.activateRoute = activateRoute;
        this.movieService = movieService;
        this.nav = nav;
        this.router = router;
        this.loadingController = loadingController;
        this.shareService = shareService;
        this.colors = ["primary", "secondary", "tertiary", "success", "warning", "danger"];
        this.detail_review = null;
    }
    ngOnInit() {
        this.review_id = this.activateRoute.snapshot.paramMap.get('id');
        this.movieService.getDetailReview(this.review_id).subscribe(result => {
            this.detail_review = result;
            console.log('detail정보', this.detail_review);
        });
    }
    openDeleteAlert() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: '리뷰 삭제',
                message: '리뷰를 정말로 삭제할까요?',
                buttons: ['취소', {
                        text: '삭제',
                        handler: () => {
                            this.loadingController.create({
                                message: 'Loading'
                            }).then((overlay) => {
                                this.loading = overlay;
                                this.loading.present();
                            });
                            this.movieService.deleteReview(this.review_id).subscribe(res => {
                                console.log('삭제완료');
                            });
                            setTimeout(() => {
                                // this.nav.back();
                                this.loading.dismiss();
                                this.router.navigate(['review/list', this.detail_review.reviewlist_id]);
                            }, 1000);
                        }
                    }]
            });
            yield alert.present();
        });
    }
    openShareAlert() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: '공유하기',
                message: '스포일러 주의! 공유내용에 감상평을 포함할까요?',
                buttons: [
                    {
                        text: '포함하기',
                        handler: () => {
                            this.shareService.socialShare(`${this.detail_review.title}\r\n\r\n\r\n${this.detail_review.overview}`, `https://image.tmdb.org/t/p/w500${this.detail_review.poster_path}`);
                        }
                    },
                    {
                        text: '포함하지않기',
                        handler: () => {
                            console.log('포함하지 않기');
                        }
                    },
                    {
                        text: '취소',
                        role: 'cancel',
                        cssClass: 'danger',
                        handler: () => {
                            console.log('Confirm Cancel: 취소');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
DetailPage = tslib_1.__decorate([
    Component({
        selector: 'app-detail',
        templateUrl: './detail.page.html',
        styleUrls: ['./detail.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [AlertController, ActivatedRoute, MovieService, NavController, Router, LoadingController, ShareService])
], DetailPage);
export { DetailPage };
//# sourceMappingURL=detail.page.js.map