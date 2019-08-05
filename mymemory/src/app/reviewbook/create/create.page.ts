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

  constructor(private movieService: MovieService,private router: Router,private nav:NavController) { }

  ngOnInit() {
    this.reviewlistForm = new FormGroup({
      title: new FormControl('',[Validators.required])
    })
  }

  onSubmit(){
   
    this.movieService.writeReviewList(this.reviewlistForm.value).subscribe();
    // this.router.navigateByUrl('reviewbook/list')
    this.router.navigate(['reviewbook/list'])
    // this.nav.navigateBack(['/']).then(()=>{
    //   this.router.navigateByUrl('reviewbook/list')
    // });
  }

}
