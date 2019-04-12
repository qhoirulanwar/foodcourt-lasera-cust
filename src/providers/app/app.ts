// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {
  
  public url: string = 'http://localhost:3000';
  // public url: string = 'http://192.168.43.167:3000';
  public dataProfil = <any>{};
  public saldo = 0

  constructor(
      // public http: HttpClient,
      public http: Http, 
      public alertCtrl: AlertController,
      public storage: Storage
    ) {
    console.log('Hello AppProvider Provider');
  }

  networkError() {
    let alert = this.alertCtrl.create({
      title: 'Koneksi Gagal',
      subTitle: 'Pastikan koneksi internet terhubung',
      // buttons: ['Dismiss']
    });
    // setTimeout(() => {
      alert.present();
    // }, 1000);
  };

  networkChek() {
    this.http.get(this.url)
    .subscribe(
      (res: Response) => {
        // console.log('Server Connected');
      },
      (error) => {
        this.networkError();
      }
    )
  };

  getProfileUser() {
    this.storage.get('userLoginInfo').then((resp) => {
      if (resp !== null) {
        this.dataProfil = resp
      }
    })
  }

  getSaldo() {
    // this.storage.get('userLoginInfo').then((resp) => {
    //   if (resp !== null) {
    //     this.dataProfil = resp

        this.http.get(this.url+'/saldo/'+this.dataProfil.userId)
        .subscribe(
          (res: Response) => {
            this.saldo = res.json().saldo;
            console.log(this.saldo);
          },
          (error) => {
            this.networkError();
          }
        )

    //   }
    // })
  };

}
