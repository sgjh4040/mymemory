import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Observable } from 'rxjs';

const type='movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  results: Observable<any>;
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
  };
  searchChanged(e){
    this.results =this.movieService.searchData(e.target.value,type)
  };
  onKeyPressed(event){
    console.log('onKeyPress')
    console.log(event);
    if(event.keyCode==13){
      let activeElement = <HTMLElement>document.activeElement;
      activeElement.blur();
      
    }
  }

}
