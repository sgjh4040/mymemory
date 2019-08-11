import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
let MainPage = class MainPage {
    constructor(authService, router, loadingController) {
        this.authService = authService;
        this.router = router;
        this.loadingController = loadingController;
    }
    ngOnInit() {
    }
    goReviewbook() {
        this.loadingController.create({
            message: 'Loading',
            spinner: 'crescent',
            cssClass: 'custom-loader-class'
        }).then((overlay) => {
            this.loading = overlay;
            this.loading.present();
        });
        setTimeout(() => {
            this.loading.dismiss();
            this.router.navigateByUrl('/reviewbook/list');
        }, 500);
    }
    logout() {
        this.authService.logout();
    }
};
MainPage = tslib_1.__decorate([
    Component({
        selector: 'app-main',
        templateUrl: './main.page.html',
        styleUrls: ['./main.page.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService, Router, LoadingController])
], MainPage);
export { MainPage };
//# sourceMappingURL=main.page.js.map