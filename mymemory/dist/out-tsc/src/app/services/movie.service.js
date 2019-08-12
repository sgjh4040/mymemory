import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { catchError, tap, map } from 'rxjs/operators';
let MovieService = class MovieService {
    constructor(http, alertController) {
        this.http = http;
        this.alertController = alertController;
        this.serverurl = environment.url;
        this.url = "https://api.themoviedb.org/3/search";
        this.apiKey = "e02050f991ddedb779571b20eb62034b";
    }
    //리뷰리스트 가져오기
    getreviewList() {
        return this.http.get(`${this.serverurl}/api/list`).pipe(catchError(e => {
            let status = e.status;
            if (status === 401) {
                this.showAlert('오류', '리스트 불러오기 실패');
            }
            throw new Error(e);
        }));
    }
    //리뷰 리스트 작성
    writeReviewList(data) {
        return this.http.post(`${this.serverurl}/api/list`, data)
            .pipe(tap(res => {
            this.showAlert('정상적으로 저장되었습니다', '성공');
        }), catchError(e => {
            this.showAlert(e.error.msg, '오류발생');
            throw new Error(e);
        }));
    }
    //리뷰 가져오기(list id 값으로 검색)
    getreview(id) {
        return this.http.get(`${this.serverurl}/api/review/${id}`);
    }
    //리뷰 등록하기
    writeReview(data) {
        return this.http.post(`${this.serverurl}/api/review`, data)
            .pipe(tap(res => {
            this.showAlert('정상적으로 저장되었습니다.', '성공');
        }), catchError(e => {
            this.showAlert(e.error.msg, '오류');
            throw new Error(e);
        }));
    }
    ;
    //credit 검색
    searchCredit() {
        return this.http.get('https://api.themoviedb.org/3/movie/17159/credits?api_key=e02050f991ddedb779571b20eb62034b')
            .pipe(map(results => {
            let casts = results['cast'];
            console.log(casts);
            return casts;
        }));
    }
    //The movie api 검색
    searchData(title, type) {
        return this.http.get(`${this.url}/${type}?language=ko-kr&api_key=${this.apiKey}&query=${encodeURI(title)}`)
            .pipe(map(results => {
            console.log("영화검색결과", results['results']);
            return results['results'];
        }));
    }
    ;
    //review detail 불러오기
    getDetailReview(id) {
        return this.http.get(`${this.serverurl}/api/review/detail/${id}`);
    }
    ;
    //review 삭제
    deleteReview(id) {
        return this.http.delete(`${this.serverurl}/api/review/${id}`);
    }
    ;
    //Alert창 생성 메소드
    showAlert(msg, title) {
        let alert = this.alertController.create({
            message: msg,
            header: title,
            buttons: ['확인']
        });
        alert.then(alert => alert.present());
    }
    ;
};
MovieService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, AlertController])
], MovieService);
export { MovieService };
//# sourceMappingURL=movie.service.js.map