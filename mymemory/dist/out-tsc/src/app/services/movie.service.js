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
        this.movieurl = "https://api.themoviedb.org/3/search";
        this.detailurl = "https://api.themoviedb.org/3";
        this.apiKey = "e02050f991ddedb779571b20eb62034b";
        this.genres = [{ "id": 28, "name": "액션" }, { "id": 12, "name": "모험" }, { "id": 16, "name": "애니메이션" }, { "id": 35, "name": "코미디" },
            { "id": 80, "name": "범죄" }, { "id": 99, "name": "다큐멘터리" }, { "id": 18, "name": "드라마" }, { "id": 10751, "name": "가족" }, { "id": 14,
                "name": "판타지" }, { "id": 36, "name": "역사" }, { "id": 27, "name": "공포" }, { "id": 10402, "name": "음악" }, { "id": 9648, "name": "미스터리" }, { "id": 10749, "name": "로맨스" }, { "id": 878, "name": "SF" }, { "id": 10770, "name": "TV 영화" }, { "id": 53, "name": "스릴러" }, { "id": 10752, "name": "전쟁" }, { "id": 37, "name": "서부" }];
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
    //리뷰 북 삭제
    deleteBook(id) {
        return this.http.delete(`${this.serverurl}/api/list/${id}`);
    }
    ;
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
    //director 검색
    searchDirector(id) {
        return this.http.get(`${this.detailurl}/movie/${id}/credits?api_key=${this.apiKey}`)
            .pipe(map(results => {
            let a = results['crew'];
            results['director'] = a.filter(res1 => {
                return (res1.job == 'Director');
            }).filter(res2 => {
                console.log('res2', res2.department);
                return (res2.department == 'Directing');
            });
            return results['director'];
        }));
    }
    //The movie api 검색
    searchData(title, type) {
        return this.http.get(`${this.movieurl}/${type}?language=ko-kr&api_key=${this.apiKey}&query=${encodeURI(title)}`)
            .pipe(map(results => {
            console.log("영화검색결과", results['results']);
            return results['results'];
        }));
    }
    ;
    //영화 detail 검색
    detailMovie(title, type) {
        return this.http.get(`${this.detailurl}/${type}?language=ko-kr&api_key=${this.apiKey}&query=${encodeURI(title)}`);
    }
    ;
    //영화 상형작 검색
    playingMovie() {
        return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=e02050f991ddedb779571b20eb62034b&language=ko-kr&page=1&region=KR')
            .pipe(map(results => {
            return results['results'];
        }));
    }
    //cgv 영화 검색
    cgvMovies() {
        return this.http.get(`${this.serverurl}/api/cgvinfo`);
    }
    //cgv 영화 detail 검색
    detailCgv(id) {
        return this.http.get(`${this.serverurl}/api/cgvdetail/${id}`);
    }
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
    //like 상태 확인
    checkLike(id) {
        return this.http.get(`${this.serverurl}/api/reviewup/state/${id}`);
    }
    //Genre id => 장르
    getGenre(id) {
        for (let i of this.genres) {
            if (i.id == id) {
                return i.name;
            }
        }
        return '';
    }
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