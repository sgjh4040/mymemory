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
  
  constructor(private imageService: ImagesService,private authService: AuthService) {
    
   }

  ngOnInit() {
    this.imageService.images=[];
    // this.imageService.STORAGE_KEY= this.authService.user.id;
    this.imageService.profile=`http://192.168.123.100:5000/api/images/${this.authService.user.id}`;
    this.nickname = this.authService.user.nickname;
  }
  

  uploadprofile(){
    this.imageService.selectProfile().then(()=>{
      console.log('프로필 업로드 완료');
    });
  }

}
