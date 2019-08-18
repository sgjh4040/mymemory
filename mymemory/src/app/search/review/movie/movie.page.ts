import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  role = 'review';
  searchTerm: string='';
  results: Observable<any>;

  constructor(private shareService: ShareService) { }

  ngOnInit() {
  }

  searchChanged(){
    console.log(this.role);
    this.results =this.shareService.getreview(this.searchTerm,this.role);
    
  };

}
