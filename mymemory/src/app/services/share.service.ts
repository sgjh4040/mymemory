import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  serverurl= environment.url;
  

  

  constructor(private http: HttpClient, private alertController: AlertController,private socialSharing: SocialSharing) { }

  getreview(id,role){
    return this.http.get(`${this.serverurl}/api/review/search/${id}?role=${role}`);
  }
  addliker(id){
    return this.http.get(`${this.serverurl}/api/review/like/${id}`).pipe(

      tap(res=>{
        this.showAlert(res['msg']);
      }),
      catchError(e=>{
        this.showAlert(e.error.msg)
        throw new Error(e);
      })
    );
  }
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: '좋아요',
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
