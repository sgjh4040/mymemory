import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  list: {};
  editButton=false;

  constructor(private movieService: MovieService, route:ActivatedRoute, private loadingController: LoadingController,private loading: LoadingService) {
    route.params.subscribe(val=>{
      this.movieService.getreviewList().subscribe(res=>{
        this.list = res;
      })
    });
   };

  ngOnInit() {
    
    this.loading.presentLoading().then(()=>{
      this.movieService.getreviewList().subscribe(res=>{
        this.list = res;
        this.loading.dismissLoading();
      })
    })
  }
  ionViewWillLeave() {
    this.editButton=false;
  }
  deleteBook(id){
    this.movieService.deleteBook(id).subscribe(res=>{
      this.movieService.getreviewList().subscribe(res=>{
        this.list = res;
      })
    });

  }
 



}
