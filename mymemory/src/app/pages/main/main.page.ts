import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private loading;

  constructor(private authService: AuthService,private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  goReviewbook(){
    this.loadingController.create({
      message: 'Loading',
      spinner: 'crescent',
      cssClass:'custom-loader-class'
    }).then((overlay)=>{
      this.loading = overlay;
      this.loading.present();
    })

    setTimeout(()=>{
      this.loading.dismiss();
      this.router.navigateByUrl('/reviewbook/list');
    },500);
  }

  logout() {
    this.authService.logout();
  }
}
