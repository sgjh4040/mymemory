import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';
let AuthGuardService = class AuthGuardService {
    constructor(auth, router, alertController) {
        this.auth = auth;
        this.router = router;
        this.alertController = alertController;
    }
    canActivate() {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            this.alertController.create({
                message: '로그인부터!',
                header: '비로그인상태',
                buttons: ['확인']
            }).then(alert => alert.present());
            return false;
        }
        return this.auth.isAuthenticated();
    }
};
AuthGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [AuthService, Router, AlertController])
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map