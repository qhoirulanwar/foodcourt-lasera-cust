import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AppProvider } from '../../../providers/app/app';

/**
 * Generated class for the TransaksiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'detil-transaksi',
  templateUrl: 'detil-transaksi.html',
})
export class DetilTransaksiPage {

  headerPesanan:any = {
    area: null,
    date_created: null,
    gerai_id: null,
    gerai_nama: null,
    keterangan: null,
    psn_id: 15386416287171,
    psn_total: null,
    status_id: null,
    status_keterangan: null,
    tempat: null,
    user_id: null,
    waktu: null
  }

  listPesanan:any = []
  jumlahPesananArray:any = []
  jumlahPesanan:string = null

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public app: AppProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransaksiPage');

    console.log(this.navParams.get('pesanan_id'));

    if (this.navParams.get('pesanan_id') != undefined) {
      this.headerPesanan = this.navParams.get('pesanan_id')
      this.getDetilPesanan()
    }

  }

  getDetilPesanan() {
    this.http.get(this.app.url+'/pemesanan/'+this.headerPesanan.psn_id+'/order')
    .subscribe(
      (res: Response) => {
        console.log(res.json());
        this.listPesanan = res.json();
        this.headerPesanan.tatalQty = this.listPesanan.length
          
        // mencari total Jumlah menu yang dipesan
        for (var i = 0; i < res.json().length; i++ ) {
          this.jumlahPesananArray.push(res.json()[i].qty)
        }
        // console.log(this.jumlahPesananArray)

        this.jumlahPesanan = this.jumlahPesananArray.reduce(this.getSum)
        console.log(this.jumlahPesanan);
        
      },
      (error) => {
        console.log('error woy');
        this.app.networkError();
      }
    )
  }

  getSum(total, num) {
    return total + num;
  }

}
