import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  auth_state=null;
  selectedPath = '';
//   pages = [{
//     title: 'My Memorys',
//     url: '/menu/main'
//   },
//   {
//     title: 'Search',
//     url: '/menu/moviemain'
//   }
// ];

  constructor(private router: Router,private authService:AuthService, private nav: NavController) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
   }

  ngOnInit() {

    if(this.authService.isAuthenticated()){
      this.auth_state=true;
    }else{
      this.auth_state=false;
    }

  }
  ionViewWillEnter(){
    if(this.authService.isAuthenticated()){
      this.auth_state=true;
    }else{
      this.auth_state=false;
    }
  }


  login(){
    this.nav.setDirection('root');
    this.router.navigateByUrl('/login')
  }
  logout(){
    this.authService.logout();
    this.auth_state=false;
  }

}
