import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ShareService } from 'src/app/services/share.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  colors = ["primary", "secondary", "tertiary", "success", "warning", "danger"];
  review_id: string;
  detail_review = null;
  like_status= null;
  user_id: string;
  private loading;


  constructor(private alertController: AlertController, private activateRoute: ActivatedRoute, private movieService: MovieService, private nav: NavController, private router: Router, private loadingController: LoadingController, private shareService: ShareService, private authService: AuthService) {


   }
  ngOnInit() {
    this.user_id = '';
    this.review_id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.authService.user) {
      this.user_id = this.authService.user.id;
    }
    console.log('접속자 ID:', this.user_id);
    this.movieService.getDetailReview(this.review_id).subscribe(result => {
      this.detail_review = result;
      console.log('detail정보', this.detail_review);
    });
    this.movieService.checkLike(this.review_id).subscribe(state=>{
      this.like_status = state;
      console.log(this.like_status);
    })
  }
  ngDoCheck() {
  }
  
  
  //좋아요up 메소드 
  addliker(id){
    this.shareService.addliker(id).subscribe();
    this.like_status= !this.like_status;
  }


  async openDeleteAlert() {
    const alert = await this.alertController.create({
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
          })
          this.movieService.deleteReview(this.review_id).subscribe(res => {
            console.log('삭제완료')
          });
          setTimeout(() => {
            // this.nav.back();
            this.loading.dismiss();
            this.router.navigate(['review/list', this.detail_review.reviewlist_id]);

          }, 1000);

        }
      }]
    });

    await alert.present();
  }

  async openShareAlert() {
    const alert = await this.alertController.create({
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
            console.log('포함하지 않기')
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
    await alert.present();
  }



}
