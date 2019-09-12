import * as tslib_1 from "tslib";
import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
const TOKEN_KEY = 'access_token';
let AuthService = class AuthService {
    constructor(http, helper, storage, plt, alertController) {
        this.http = http;
        this.helper = helper;
        this.storage = storage;
        this.plt = plt;
        this.alertController = alertController;
        this.url = environment.url;
        this.user = null;
        this.authenticationState = new BehaviorSubject(false);
        this.plt.ready().then(() => {
            console.log('checkToken');
            this.checkToken();
        });
    }
    checkToken() {
        this.storage.get(TOKEN_KEY).then(token => {
            if (token) {
                let decoded = this.helper.decodeToken(token);
                let isExpired = this.helper.isTokenExpired(token);
                if (!isExpired) {
                    this.user = decoded;
                    this.authenticationState.next(true);
                }
                else {
                    this.storage.remove(TOKEN_KEY);
                }
            }
        });
    }
    register(credentials) {
        return this.http.post(`${this.url}/api/register`, credentials).pipe(catchError(e => {
            this.showAlert(e.error.msg);
            throw new Error(e);
        }));
    }
    login(credentials) {
        return this.http.post(`${this.url}/api/login`, credentials)
            .pipe(tap(res => {
            this.storage.set(TOKEN_KEY, res['token']);
            this.user = this.helper.decodeToken(res['token']);
            this.authenticationState.next(true);
        }), catchError(e => {
            this.showAlert(e.error.msg);
            throw new Error(e);
        }));
    }
    logout() {
        this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }
    //test
    getSpecialData() {
        return this.http.get(`${this.url}/api/special`).pipe(catchError(e => {
            let status = e.status;
            if (status === 401) {
                this.showAlert('로그인 되어있지 않습니다!');
                this.logout();
            }
            throw new Error(e);
        }));
    }
    isAuthenticated() {
        return this.authenticationState.value;
    }
    showAlert(msg) {
        let alert = this.alertController.create({
            message: msg,
            header: '에러',
            buttons: ['OK']
        });
        alert.then(alert => alert.present());
    }
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, JwtHelperService, Storage,
        Platform, AlertController])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map