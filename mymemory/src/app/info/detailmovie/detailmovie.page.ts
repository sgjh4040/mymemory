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
    slidesPerView:1,
    autoplay: {delay:3000},
    speed:2000
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
