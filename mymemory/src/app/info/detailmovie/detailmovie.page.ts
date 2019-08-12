import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detailmovie',
  templateUrl: './detailmovie.page.html',
  styleUrls: ['./detailmovie.page.scss'],
})
export class DetailmoviePage implements OnInit {
  detailId = '';
  result = null;

  slideOpts={
    initialSlide: 1,
    speed: 1000,
    slidesPerView: 1
  }

  constructor(private activatedRouter: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.detailId = this.activatedRouter.snapshot.paramMap.get('id');
    this.movieService.detailCgv(this.detailId).subscribe(res=>{
      this.result = res;
      console.log(this.result);
    })


  }



}
