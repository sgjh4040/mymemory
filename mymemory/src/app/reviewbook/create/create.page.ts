import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  reviewlistForm: FormGroup;

  bookIcons = ['icon_books.png','icon_like.png','icon_movie.png','icon_music.png','icon_restaurant.png','icon_tv.png'];
  bookIcon ='';

  constructor(private movieService: MovieService,private router: Router,private nav:NavController) { }

  

  ngOnInit() {
    this.bookIcon='icon_books.png';
    this.reviewlistForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      profile: new FormControl(this.bookIcon)
    })
  }

  onSubmit(){
    console.log(this.bookIcon);
    console.log(this.reviewlistForm.value)
    this.movieService.writeReviewList(this.reviewlistForm.value).subscribe();
    // this.router.navigateByUrl('reviewbook/list')
    this.router.navigate(['reviewbook/list'])
    // this.nav.navigateBack(['/']).then(()=>{
    //   this.router.navigateByUrl('reviewbook/list')
    // });
  }
  click(img){
    this.bookIcon=img;
  }

}
