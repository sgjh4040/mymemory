import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidator } from './password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  registerForm: FormGroup;
  password: String;
  confirmPassword: String;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      
      passwordGroup: new FormGroup({
        password: new FormControl('',[Validators.required,, Validators.minLength(6)]),
        confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)])
      },PasswordValidator.match),
      nickname: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    console.log(this.registerForm.value);
    if (this.password == this.confirmPassword) {
      this.registerForm.value.password=this.password;
      this.authService.register(this.registerForm.value).subscribe(res => {
        // Call Login to automatically login the new user
        this.authService.login(this.registerForm.value).subscribe(state=>{
          if(state!=null){
            this.router.navigate(['/menu/main']);
          }
        });
      });
    }
  }

}
