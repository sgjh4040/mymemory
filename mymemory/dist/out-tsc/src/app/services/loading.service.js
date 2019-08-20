import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
let LoadingService = class LoadingService {
    constructor(loadingController) {
        this.loadingController = loadingController;
    }
    presentLoading() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.loading = yield this.loadingController.create({
                message: 'Loading',
                spinner: 'crescent',
                cssClass: 'custom-loader-class'
            });
            yield this.loading.present();
        });
    }
    dismissLoading() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.loading.dismiss();
        });
    }
};
LoadingService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [LoadingController])
], LoadingService);
export { LoadingService };
//# sourceMappingURL=loading.service.js.map