import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Response } from "@angular/http";

import { AppProvider } from '../../../providers/app/app';

/**
 * Generated class for the PesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'proses-pesanan',
  templateUrl: 'proses-pesanan.html',
})
export class ProsesPesananPage {

  area:string = "kantin"
  totalMeja = 15
  pilihanMeja:number = 0
  tempatPesanan:string
  keterangan:string
  tampilMeja:boolean = true
  
  dataUser_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http, public app: AppProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }

  pilihTempat() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Kantin',
      value: 'kantin'
    });

    alert.addInput({
      type: 'radio',
      label: 'Area Kampus',
      value: 'kampus'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        this.area = data;
        // this.testRadioOpen = false;
        // this.testRadioResult = data;
      }
    });

    alert.present();
  };

  selectTempat() {
    console.log(this.area);
    if (this.area !== 'kantin') {
      this.tampilMeja = false
    } else {
      this.tampilMeja = true
    }
  };

  selectMeja() {
    console.log(this.pilihanMeja)
  };

  counter(i: number) {
    return new Array(i);
  };

  selesaiPesanan() {
    console.log(this.tempatPesanan);
    
    if (this.pilihanMeja == 0 && this.tempatPesanan == undefined || this.tempatPesanan == "" ) {
      console.log("pilih tempat pesanan");
      
    } else {
      console.log("tempat dipilih");
      
      this.storage.get("userLoginInfo").then((dataUser) => {
        this.dataUser_id = dataUser.userId
      })
  
      this.storage.get("listOrder").then((data) => {
        const dataTrx = {
          "user_id": this.dataUser_id,
          "area": this.area,
          "tempat": this.returnTempat(),
          "keterangan": this.keterangan,
          "listOrder": data
        }
        console.log(dataTrx);
        
        this.http.post(this.app.url+'/trx/pemesanan',dataTrx)
        .subscribe(
          (res: Response) => {
            console.log("sukses pak eko");
            const alert = this.alertCtrl.create({
              // title: 'New Friend!',
              subTitle: res.json().message,
              buttons: ['OK']
            });
            alert.present();
            this.storage.remove("listOrder")
            this.app.getSaldo()
            this.navCtrl.pop();
            this.navCtrl.pop();
          },
          (error) => {
            this.app.networkError();
          }
        )
      })
    }
  }

  returnTempat() {
    if (this.area == "kantin") {
      return this.pilihanMeja
    } else {
      return this.tempatPesanan
    }
  }

}
