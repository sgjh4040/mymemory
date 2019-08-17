import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private loading;

  constructor(private authService: AuthService,private router: Router, private movieService: MovieService) { }
  
  playingMovies: Observable<any>
  sliderConfig={
    slidesPerView:1,
    autoplay: {
      delay:3000,
      disableOnInteraction:false
    },
    speed:2000,

  }


  ngOnInit() {
    this.loadPlayingMovie();
  }

  loadPlayingMovie(){
    this.playingMovies = this.movieService.playingMovie();
  }

  goReviewbook(){
    this.router.navigateByUrl('/reviewbook/list');
  }

  logout() {
    this.authService.logout();
  }
  chat(){
    this.router.navigateByUrl('/chat');
  }
}
