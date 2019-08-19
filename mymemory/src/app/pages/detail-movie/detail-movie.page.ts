import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
})
export class DetailMoviePage implements OnInit {
  slideOpts={
    slidesPerView:2.6,
    speed:1000,
    spaceBetween:8,
  }

  constructor() { }

  ngOnInit() {
  }

}
