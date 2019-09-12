import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list_id: string;
  list= null;

  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService,route: ActivatedRoute,private router: Router,private loading:LoadingService) { 
  }
 

  ngOnInit() {
    this.list_id = this.activateRoute.snapshot.paramMap.get('id');
    this.getReviews();
   
  }
  ionViewWillEnter(){
  
    this.getReviews();
  }
  getReviews(){
    this.movieService.getreview(this.list_id).subscribe(res=>{
      this.list = res;
    });
    
  }
  godetailreview(id){
    this.router.navigate(['review/detail',id]);
  }

  

}
