import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {
  nickname:string ='';
  
  constructor(private imageService: ImagesService,private authService: AuthService,private cdRef: ChangeDetectorRef) {
    
   }

  ngOnInit() {
    this.imageService.images=[];
    // this.imageService.STORAGE_KEY= this.authService.user.id;
    this.imageService.profile='http://172.30.1.52:5000/api/images/'+this.authService.user.id;
    this.nickname = this.authService.user.nickname;
    // this.imageService.loadStoragedImage();
  }
  

  uploadprofile(){
    this.imageService.selectProfile().then(()=>{
      console.log('끝');
    });
  }

}
