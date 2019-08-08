import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list: {};

  constructor(private movieService: MovieService, route:ActivatedRoute) {
    route.params.subscribe(val=>{
      this.movieService.getreviewList().subscribe(res=>{
        this.list = res;
      })
    });
   };

  ngOnInit() {
    console.log("ngOninit");
    this.movieService.getreviewList().subscribe(res=>{
      this.list = res;
    })
  }

}
