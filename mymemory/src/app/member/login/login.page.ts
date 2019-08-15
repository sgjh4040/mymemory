import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(state=>{
      if(state!=null){
        this.router.navigate(['/menu/main']);
      }
    });
  };
  register() {
    this.authService.register(this.loginForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.loginForm.value).subscribe(state=>{
        if(state!=null){
          this.router.navigate(['/menu/main']);
        }
      });
    });
  }

}
