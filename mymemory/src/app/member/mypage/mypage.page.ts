import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  constructor(private imageService: ImagesService,private authService: AuthService) { }

  ngOnInit() {
    this.imageService.STORAGE_KEY= this.authService.user.id;
    this.imageService.loadStoragedImage();
  }

}
