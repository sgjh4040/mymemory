import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  role = 'review';
  searchTerm: string='';
  results: Observable<any>;

  constructor(private shareService: ShareService,private router: Router) { }

  ngOnInit() {
  }

  searchChanged(){
    console.log(this.role);
    this.results =this.shareService.getreview(this.searchTerm,this.role);
    
  };
  godetailreview(id){
    this.router.navigate(['review/detail',id]);
  };

}
