import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable, from, Subscription } from 'rxjs';
import { map, tap,filter  } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(){
    const obserable$ = from(this.myArray);
    this.subscription =obserable$.pipe(
      map(item=>item*2),
      filter(res=>res>4),
      tap(item=> console.log(item))
      
    ).subscribe()
    
  }


  myArray=[1,2,3,4,5];
  subscription: Subscription;

  results: Observable<any>

  constructor(private movieService: MovieService) {}

  search(){
    console.log('메소드 실행')
    this.movieService.searchDirector().subscribe(res=>{
      console.log(res);
    })
  }

  test(){
    
  }

}
