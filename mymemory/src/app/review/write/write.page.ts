import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController, NavController } from '@ionic/angular';
import { MoviePage } from 'src/app/search/api/movie/movie.page';
import { ImagesService } from 'src/app/services/images.service';


@Component({
  selector: 'app-write',
  templateUrl: './write.page.html',
  styleUrls: ['./write.page.scss'],
})
export class WritePage implements OnInit {
  list_id: string;
  reviewForm: FormGroup;
  movie={};
  nowdate:String =new Date().toISOString();


  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService,private modalController: ModalController, private router: Router,private nav: NavController,private imageService:ImagesService) { }

  ngOnInit() {
    this.list_id=this.activateRoute.snapshot.paramMap.get('id');
    this.imageService.images=[];
    this.imageService.STORAGE_KEY= this.createImagesfolder();
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      title: new FormControl('',[Validators.required]),
      release_date: new FormControl(''),
      director: new FormControl(''),
      overview: new FormControl(''),
      genre: new FormControl(''),
      watch_date: new FormControl(''),
      poster_path: new FormControl(''),
      rating: new FormControl(''),
      famouse_line: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),

    })
  };
  onSubmit(){
    let that=this;
    this.reviewForm.value.reviewlist_id= this.list_id;
    this.reviewForm.value.images_id=this.imageService.STORAGE_KEY;
    console.log('저장내용',this.reviewForm.value);
    this.movieService.writeReview(this.reviewForm.value).subscribe();

    //서버 저장 시간 텀을 두기위해.
    setTimeout(function(){
      that.router.navigateByUrl(`/review/list/${that.list_id}`)
    },500);


    
    
    
  };
  async openSearchMovieModal(){
    const modal = await this.modalController.create({
      component: MoviePage,
    });
    modal.onDidDismiss()
    .then((data) => {

      if(data['data']!=undefined){
        this.movie = data['data'];
        this.movie['genre']=this.movie['genre_ids'][0];
     
      this.movieService.searchDirector(this.movie['id']).subscribe(res=>{
        this.movie['director'] = res[0];
      });
      }
      
      
      
    })
    return await modal.present(); 
  };
  createImagesfolder() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + "";
    return newFileName;
  }

}
