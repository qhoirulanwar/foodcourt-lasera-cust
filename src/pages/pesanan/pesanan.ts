import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AlertController } from 'ionic-angular';

import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the PesananPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',
})
export class PesananPage {

  cartItems: any;
  total: any = 0.0;
  // showEmptyCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public alertCtrl: AlertController, public app:AppProvider) {

    storage.ready().then(() => {
      storage.get("listOrder").then( (data)=>{
        if (data == null || data.length == 0) {
          data = [];
        }
        
        this.cartItems = data;
        console.log(this.cartItems);

        if ( this.cartItems.length > 0 ) {
          this.cartItems.forEach((item, index) => {
            this.total = this.total + (item.menu_gerai.harga * item.qty)
          })
        } 
        // else {
        //   this.showEmptyCartMessage = true;
        // }
      })
    })

  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }

  lanjutkanPesanan() {
    // this.navCtrl.push('ProsesPesananPage')
    console.log(this.total);

    if (this.app.saldo >= this.total) {
      this.navCtrl.push('ProsesPesananPage')
    } else {
      const alert = this.alertCtrl.create({
        // title: 'New Friend!',
        subTitle: 'Saldo anda tidak mencukupi untuk melakukan transaksi, Silahkan lakukan topup',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }

  hapusMenuPesanan(listOrder, i) {
    let price = listOrder.menu_gerai.harga;
    let qty = listOrder.qty;

    this.cartItems.splice(i, 1);
    this.storage.set("listOrder", this.cartItems).then(()=>{
      this.total = this.total - (price * qty);
    })
  }
  
  addCatatan(i) {
    const prompt = this.alertCtrl.create({
      title: 'Catatan',
      message: "Masukan catatan untuk menu makanan yang dipilih",
      inputs: [
        {
          name: 'catatan',
          placeholder: 'Catatan',
          value: this.cartItems[i].catatan
        },
      ],
      buttons: [
        {
          text: 'Batal',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Simpan',
          handler: data => {
            console.log(data.catatan);
            this.cartItems[i].catatan = data.catatan;

            this.storage.set("listOrder", this.cartItems).then(()=>{
              console.log("Catatan sukses");
            });
          }
        }
      ]
    });
    prompt.present();
  }


}
