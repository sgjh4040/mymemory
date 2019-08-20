import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
})
export class DetailMoviePage implements OnInit {

  result = {};
  casts:Observable<any>;
  videos= [];
  type='movie';
  detailId:string;
  slideOpts={
    slidesPerView:2.6,
    speed:1000,
    spaceBetween:8,
  }

  constructor(private movieService: MovieService,private activatedRouter: ActivatedRoute,private doms:DomSanitizer) { }

  ngOnInit() {
    this.detailId=this.activatedRouter.snapshot.paramMap.get('id');
    this.movieService.detailMovie(this.detailId,this.type).subscribe(res=>{
      this.result=res;
    })
    this.casts = this.movieService.searchCasts(this.detailId);
    this.movieService.searchVideos(this.detailId).subscribe(res=>{
      console.log(res);
      res.map(video=>{
      video['trustedVideoUrl']= this.doms.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+video['key']);
    })
    this.videos=res;
    console.log(this.videos);
    });
    
    
   
  }

}
