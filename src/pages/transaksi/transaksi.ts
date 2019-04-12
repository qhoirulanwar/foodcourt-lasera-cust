import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';

import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the TransaksiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaksi',
  templateUrl: 'transaksi.html',
})
export class TransaksiPage {

  listDataPemesana:any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public app: AppProvider) {
    console.log(this.navParams.get('status_pesanan'));
    // this.getDataPemesanan()

    if (this.navParams.get('status_pesanan') == undefined) {
      this.listDataPemesana = []
    } else {
      this.getDataPemesanan()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaksiPage');
  }

  detilTrx(index: any) {
    console.log(this.listDataPemesana[index]);
    
    this.navCtrl.push('DetilTransaksiPage', {"pesanan_id":this.listDataPemesana[index]})
    // this.navCtrl.push('DetilTransaksiPage')
  }

  getDataPemesanan() {
    this.http.get(this.app.url+'/pemesanan/'+this.app.dataProfil.userId+'/'+this.navParams.get('status_pesanan'))
    .subscribe(
      (res: Response) => {

        console.log(res.json().message);

        this.listDataPemesana = res.json();
        console.log(this.listDataPemesana);
        
        this.app.getSaldo()
      },
      (error) => {
        this.app.networkError();
      }
    )
  }

}
