import { AbstractControl } from '@angular/forms';


export class PasswordValidator{
    static match(form:AbstractControl){
        const password = form.get('password').value;
        const confirmPassword = form.get('confirmPassword').value;

        if(password !==confirmPassword){
            //일치하지 않는 경우 에러 객체 반환
            return {match:{password,confirmPassword}};
        }else{
            //일치하는 경우 null 반환
            return null;
        }
    }
}