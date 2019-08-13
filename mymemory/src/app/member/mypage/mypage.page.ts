import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  constructor(private imageService: ImagesService) { }

  ngOnInit() {
    this.imageService.loadStoragedImage();
  }

}
