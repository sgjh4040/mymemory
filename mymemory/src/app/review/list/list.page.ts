import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list_id: string;
  list: {};

  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService,route: ActivatedRoute) { 
    route.params.subscribe(val=>{
      console.log('bbbb')
      this.list_id = this.activateRoute.snapshot.paramMap.get('id');
      this.movieService.getreview(this.list_id).subscribe(res=>{
        this.list = res;
      });
      console.log(this.list);
    })

  }
 

  ngOnInit() {
    // this.list_id = this.activateRoute.snapshot.paramMap.get('id');
    // this.movieService.getreview(this.list_id).subscribe(res=>{
    //   this.list = res;
    // });

  }

}
