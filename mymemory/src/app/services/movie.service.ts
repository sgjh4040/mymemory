import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';
import { catchError, tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  serverurl= environment.url;
  movieurl = "https://api.themoviedb.org/3/search";
  detailurl ="https://api.themoviedb.org/3"

  apiKey = "e02050f991ddedb779571b20eb62034b";

  constructor(private http: HttpClient,private alertController: AlertController) { }



  //리뷰리스트 가져오기
  getreviewList(){
    return this.http.get(`${this.serverurl}/api/list`).pipe(
      
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          this.showAlert('오류','리스트 불러오기 실패');
        }
        throw new Error(e);
      })
    );
  }
  //리뷰 리스트 작성
  writeReviewList(data){
    return this.http.post(`${this.serverurl}/api/list`,data)
    .pipe(
      tap(res=>{
        this.showAlert('정상적으로 저장되었습니다','성공');
      }),
      catchError(e => {
        this.showAlert(e.error.msg,'오류발생');
        throw new Error(e);
      })
    )
  }
  //리뷰 가져오기(list id 값으로 검색)
  getreview(id){
    return this.http.get(`${this.serverurl}/api/review/${id}`);
  }

  //리뷰 등록하기
  writeReview(data){
    return this.http.post(`${this.serverurl}/api/review`,data)
    .pipe(
      tap(res => {
        this.showAlert('정상적으로 저장되었습니다.','성공');
      }),
      catchError(e => {
        this.showAlert(e.error.msg,'오류');
        throw new Error(e);
      })
    )
  };
  //director 검색
  searchDirector(): Observable<any>{
    return this.http.get('https://api.themoviedb.org/3/movie/17159/credits?api_key=e02050f991ddedb779571b20eb62034b')
    .pipe(
      map(results=>{
        let a = results['crew'];

        results['test']= a.filter(res1=>{
          return (res1.job=='Director')
        }).filter(res2=>{
          console.log('res2',res2.department);
          return (res2.department=='Directing')
        })
        return results['test'];
      })
      
      
    )
  }


  //The movie api 검색
  searchData(title: string, type: string): Observable<any>{
    return this.http.get(`${this.movieurl}/${type}?language=ko-kr&api_key=${this.apiKey}&query=${encodeURI(title)}`)
    .pipe(
      map(results => {
        console.log("영화검색결과",results['results']);
        return results['results']
      })
    );
  };
  //영화 detail 검색
  detailMovie(title: string, type: string): Observable<any>{
    return this.http.get(`${this.detailurl}/${type}?language=ko-kr&api_key=${this.apiKey}&query=${encodeURI(title)}`);
  };
  //영화 상형작 검색
  playingMovie():Observable<any>{
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=e02050f991ddedb779571b20eb62034b&language=ko-kr&page=1&region=KR')
    .pipe(
      map(results => {
        return results['results']
      })
    )
  }
  //cgv 영화 검색
  cgvMovies():Observable<any>{
    return this.http.get(`${this.serverurl}/api/cgvinfo`);
  }
  //cgv 영화 detail 검색
  detailCgv(id): Observable<any>{
    return this.http.get(`${this.serverurl}/api/cgvdetail/${id}`);
  }
  
  

  //review detail 불러오기
  getDetailReview(id){
    return this.http.get(`${this.serverurl}/api/review/detail/${id}`);
  };

  //review 삭제
  deleteReview(id){
    return this.http.delete(`${this.serverurl}/api/review/${id}`);
  };

  //like 상태 확인
  checkLike(id){
    return this.http.get(`${this.serverurl}/api/reviewup/state/${id}`)
  }




  //Alert창 생성 메소드
  showAlert(msg,title) {
    let alert = this.alertController.create({
      message: msg,
      header: title,
      buttons: ['확인']
    });
    alert.then(alert => alert.present());
  };
}
