import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize, tap, catchError, find } from 'rxjs/operators';


// const STORAGE_KEY = 'abc';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  STORAGE_KEY = 'abc'
  images = [];
  reviewId = '123';

  constructor(private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private filePath: FilePath) { }


  loadStoragedImage() {
    this.storage.get(this.STORAGE_KEY).then(images => {
      console.log(images);
      if (images) {
        let arr = JSON.parse(images);

        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          console.log(filePath);
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    })
  }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      // let converted = this.webview.convertFileSrc(img);

      return img;
    }
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });
  }
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  updateStoredImages(name) {

    this.storage.get(this.STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(this.STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(this.STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];

    });

  }
  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(this.STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(this.STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('File removed.');
      });
    });
  }
  async startUploads(id){
    this.reviewId = id;
    let files = [];
    for(let image of this.images){
      let a= await this.file.resolveLocalFilesystemUrl(image.path)
      let b= await this.getfile(a);
      this.readFile(b);
    }

  }
  getfile(filepath){
    return new Promise(function(resolve,reject){
      <FileEntry>filepath.file(file=>{
        resolve(file);
      })
    })
  }
  startUpload(imgEntry) {
    console.log(imgEntry.filePath);
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
        console.log("entry",entry);
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        this.presentToast('Error while reading file.');
      });
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: 'Uploading image...',
    });
    await loading.present();

    this.http.put("http://172.30.1.55:5000/api/images/"+'123', formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        }),
        catchError(e => {
          let status = e.status;
          console.log(e);
          throw new Error(e);
        })
        
      )
      .subscribe(res => {
        console.log('succes',res['success']);
        if (res['success']) {
          this.presentToast('File upload complete.')
          
        } else {
          this.presentToast('File upload failed.')
        }
      })
      
      
      ;
  }
  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);

      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
