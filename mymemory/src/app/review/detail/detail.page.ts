import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  tags = ["뮤지컬","윌 스미스","디즈니","알라딘","추억","영화","굿"];
  colors = ["primary","secondary","tertiary","success","warning","danger"];
  review_id:string;
  detail_review= null;


  constructor(private alertController: AlertController, private activateRoute: ActivatedRoute,private movieService: MovieService ) { }

  ngOnInit() {
    this.review_id = this.activateRoute.snapshot.paramMap.get('id');
    this.movieService.getDetailReview(this.review_id).subscribe(result=>{
      this.detail_review = result;
      console.log('detail정보',this.detail_review);
    })
  }
  async openDeleteAlert(){
    const alert = await this.alertController.create({
      header: '리뷰 삭제',
      message: '리뷰를 정말로 삭제할까요?',
      buttons: ['취소', '삭제']
    });

    await alert.present();
  }

  async openShareAlert(){
    const alert = await this.alertController.create({
      header:'공유하기',
      message: '스포일러 주의! 공유내용에 감상평을 포함할까요?',
      buttons:[
        {
          text:'포함하기',
          handler: () =>{
            console.log('포함하기')
          }
        },
        {
          text:'포함하지않기',
          handler: () =>{
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
