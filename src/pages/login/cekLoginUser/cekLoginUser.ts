import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  template: ``
})
export class cekLoginUser {

  constructor( public navCtrl: NavController, public storage: Storage ) {
    this.cekUserLogin();
  }

  cekUserLogin(){
    this.storage.get('userLoginInfo').then((resp) => {
      if(resp == null){
        this.navCtrl.setRoot('LoginPage');
      } else {
        this.navCtrl.setRoot('SideNavPage');
      }
    })
  };

}
