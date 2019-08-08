import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  serverurl= environment.url;
  

  

  constructor(private http: HttpClient, private alertController: AlertController,private socialSharing: SocialSharing) { }

  getreview(id){
    return this.http.get(`${this.serverurl}/api/search/review/${id}`);
  }
  addliker(id){
    return this.http.get(`${this.serverurl}/api/search/reviewup/${id}`).pipe(
      catchError(e=>{
        this.showAlert(e.error.msg)
        throw new Error(e);
      })
    );
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['확인']
    });
    alert.then(alert => alert.present());
  }
  socialShare(message,image){
    // this.socialSharing.shareWithOptions(this.options).then((res)=>{
    //   console.log('res',res);
    // }).catch(e=>{
    //   console.log('e',e);
    // })
    this.socialSharing.share(message,null,[image]).then((res)=>{
      console.log('res',res);
    }).catch(e=>{
      console.log('e',e);
    })
  }

  




}
