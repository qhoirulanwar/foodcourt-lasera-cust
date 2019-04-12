import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Storage } from '@ionic/storage';

import { AppProvider } from '../../../providers/app/app';

@IonicPage()
@Component({
  selector: 'page-menugerai',
  templateUrl: 'menu-gerai.html',
})
export class MenuGeraiPage {

  listMenu: any;
  cartItems: any = [];
  total: number = 0.0;

  constructor(
    public app:AppProvider, 
    public http:Http, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController
  ) {

  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuGeraiPage');
    if (this.navParams.get('gerai_id') == undefined) {
      this.listMenu = [];
    } else {
      this.getListMenu()
    }

    this.hitungTotal()
  };

  tinjauPensanan() {
    this.navCtrl.pop();
    this.navCtrl.push('PesananPage')
  };

  getListMenu() {
    this.http.get(this.app.url+'/gerai-menu/'+this.navParams.get('gerai_id'))
      .subscribe(
        (res: Response) => {
            if (res.status == 200) {
              this.listMenu = res.json();
              console.log(this.listMenu);
            } else {
              this.listMenu = [];
            }
        },
        (error) => {
          console.log('error woy');
          this.app.networkError();
        }
      )
  };

  cekKesamaanGeraiMenu(menuId:number){
    const lihatObj = this.cariObjFromArray(menuId, this.listMenu)

    if (this.cartItems.length == 0) {

      console.log('keranjang kosong');
      this.addPesanan(menuId)
      
    } else {
      
        // cek apakah gerai dari menu yang dipesan sama dengan menu gerai yang sebelumnya
        if (this.listMenu[lihatObj].gerai_id == this.cartItems[0].menu_gerai.gerai_id) {
          console.log('menu yang dipilih sama dengan geraimenu yang sebelumnya');
          this.addPesanan(menuId)
          
        } else {
          console.log('menu yang dipilih tidak sama dengan geraimenu yang sebelumnya');
          const confirm = this.alertCtrl.create({
            title: 'Mau ganti gerai?',
            message: 'Boleh kok. Tapi, menu yang kamu pilih dari gerai sebelumnya kita hapus ya?',
            buttons: [
              {
                text: 'Tidak Jadi',
                handler: () => {
                  console.log('Disagree clicked');
                }
              },
              {
                text: 'Oke, Ganti',
                handler: () => {
                  console.log('Agree clicked');
                  this.gantiGerai();

                  setTimeout(() => {
                    this.addPesanan(menuId)
                  }, 100);
                  
                }
              }
            ]
          });
          confirm.present();

        }
    }

  }

  addPesanan(menuId:number) {
    const lihatObj = this.cariObjFromArray(menuId, this.listMenu)

    console.log(menuId);
    console.log(lihatObj);
    console.log(this.listMenu[lihatObj].gerai_id);

    this.storage.get("listOrder").then((data) => {
      if (data == null || data.length == 0) {
        data = [];
        
        data.push({
          "menu_gerai": this.listMenu[lihatObj],
          "qty": 1,
          "amount": parseFloat(this.listMenu[lihatObj].harga),
          "catatan": ""
        });
      } else {
        let added = 0;

        for (let i = 0; i < data.length; i++) {
          if (this.listMenu[lihatObj].menu_id == data[i].menu_gerai.menu_id) {
            let qty = data[i].qty;

            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].menu_gerai.harga);
            added = 1;
            
            console.log("product sudah dalam keranjang");
          }
        }

        if (added == 0) {
          data.push({
            "menu_gerai": this.listMenu[lihatObj],
            "qty": 1,
            "amount": parseFloat(this.listMenu[lihatObj].harga),
            "catatan": ""
          });
        }
      }

      this.storage.set("listOrder", data).then( ()=>{
        console.log("listOrder Updated");
        console.log(data);
      })
    })
    this.total = parseFloat(this.listMenu[lihatObj].harga)
    this.hitungTotal()
  };

  gantiGerai() {
    this.storage.set("listOrder", []).then(()=>{
      console.log('gerai berhasil diganti');
    })
  }

  hitungTotal() {
    this.storage.ready().then(() => {
      this.storage.get("listOrder").then( (data)=>{
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
        console.log(this.total);
        
      })
    })
  };

  cariObjFromArray(valuetosearch, arrayData) {
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i]["menu_id"] == valuetosearch) {
        return i;
      }
    }
    return null;
  };

}
