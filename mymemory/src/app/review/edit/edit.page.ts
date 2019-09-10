import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController, NavController } from '@ionic/angular';
import { MoviePage } from 'src/app/search/api/movie/movie.page';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  review_id: string;
  reviewForm: FormGroup;
  rating: number;
  movie = {};
  nowdate: String = new Date().toISOString();

  constructor(private activateRoute: ActivatedRoute, private movieService: MovieService, private modalController: ModalController, private router: Router, private nav: NavController, private imageService: ImagesService) { }

  ngOnInit() {
    this.review_id = this.activateRoute.snapshot.paramMap.get('id');
    this.imageService.images = [];
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      release_date: new FormControl(''),
      director: new FormControl(''),
      overview: new FormControl(''),
      genre: new FormControl(''),
      watch_date: new FormControl(''),
      poster_path: new FormControl(''),
      backdrop_path: new FormControl(''),
      rating: new FormControl(''),
      famouse_line: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),

    })
    this.getMovie();
  }
  ionViewWillEnter() {
  }
  getMovie() {
    this.movieService.getDetailReview(this.review_id).subscribe(result => {
      this.movie = result;
      this.rating= this.movie['rating'];
      console.log(this.movie);
    });
  }

  onSubmit() {
    let that = this;
    this.reviewForm.value.reviewlist_id = this.review_id;
    console.log(this.reviewForm.value);
    this.movieService.editReview(this.reviewForm.value,this.review_id).subscribe(()=>{
      that.router.navigateByUrl(`/review/list/${that.review_id}`)
    });
  };
  async openSearchMovieModal() {
    const modal = await this.modalController.create({
      component: MoviePage,
    });
    modal.onDidDismiss()
      .then((data) => {

        if (data['data'] != undefined) {
          this.movie = data['data'];
          this.movie['genre'] = this.movie['genre_ids'][0];

          this.movieService.searchDirector(this.movie['id']).subscribe(res => {
            this.movie['director'] = res[0];
          });
        }
      })
    return await modal.present();
  };

}
