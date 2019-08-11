import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
 
  constructor(public auth: AuthService,private router: Router,private alertController: AlertController) {}
 
  canActivate(): boolean {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      this.alertController.create({
        message: '로그인부터!',
        header: '비로그인상태',
        buttons: ['확인']
      }).then(alert=> alert.present());

      return false;
    }
    return this.auth.isAuthenticated();
  }
}