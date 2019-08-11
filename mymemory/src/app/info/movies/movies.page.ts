import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  playingMovies: Observable<any>;
  cgvMovies: Observable<any>;
  sliderConfig = {
    initialSlide: 1,
    speed: 1000,
    slidesPerView: 2
  }

  constructor(private movieService: MovieService) { }


  ngOnInit() {
    this.loadPlayingMovie();
    this.loadcgvMovie();
  }

  loadPlayingMovie(){
    
    this.playingMovies = this.movieService.playingMovie();
  }
  loadcgvMovie(){
    this.cgvMovies = this.movieService.cgvMovies();
  }

}
