import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import { AppProvider } from '../../providers/app/app';

@IonicPage()
@Component({
  selector: 'page-gerai',
  templateUrl: 'gerai.html',
})
export class GeraiPage {

  listGerai: any;
  saldo = 0
  dataProfil = <any>{};

  constructor(
    public app:AppProvider, 
    public http:Http, 
    public navCtrl:NavController, 
    public navParams:NavParams,
    public storage: Storage

  ) {
    // this.app.getProfileUser()
    setInterval(() => {
      this.app.getSaldo()
    }, 3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeraiPage');

    this.http.get(this.app.url+'/gerai-menu')
    .subscribe(
      (res: Response) => {
        this.listGerai = res.json();
        console.log(this.listGerai);
      },
      (error) => {
        this.app.networkError();
      }
    )
  }

  // getSaldo() {
  //   this.storage.get('userLoginInfo').then((resp) => {
  //     if (resp !== null) {
  //       this.dataProfil = resp

  //       this.http.get(this.app.url+'/saldo/'+this.dataProfil.userId)
  //       .subscribe(
  //         (res: Response) => {
  //           this.saldo = res.json().saldo;
  //           console.log(this.saldo);
  //         },
  //         (error) => {
  //           this.app.networkError();
  //         }
  //       )

  //     }
  //   })
  // };

  openKedaiMenu( gerai_id:number ) {
    this.navCtrl.push('MenuGeraiPage', {"gerai_id":gerai_id})
  }

}
