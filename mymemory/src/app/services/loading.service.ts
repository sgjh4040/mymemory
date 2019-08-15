import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading;

  constructor(private loadingController: LoadingController) { }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'crescent',
      cssClass:'custom-loader-class'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }
}
