import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

import { AppProvider } from '../../providers/app/app';


/**
 * Generated class for the SideNavPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-side-nav',
  templateUrl: 'side-nav.html',
})
export class SideNavPage {

  homePage: any;
  dataProfil = <any>{};
  
  @ViewChild(Nav) nav: Nav;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage : Storage, 
    public menuCtrl: MenuController,
    public app:AppProvider
    ) {

    this.homePage = 'GeraiPage'
    this.app.getProfileUser()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideNavPage');
    // this.profileUser()
  }

  openPageRoot(page: string) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  };

  openPage(page: string, statusPsn: string) {
    this.nav.setRoot(page, {"status_pesanan": statusPsn});
    this.menuCtrl.close();
  };

  logout() {
    this.storage.remove('userLoginInfo')
    this.storage.remove('listOrder')
    this.navCtrl.setRoot('LoginPage')
  };

  // profileUser() {
  //   this.storage.get('userLoginInfo').then((resp) => {
  //     if (resp !== null) {
  //       this.dataProfil = resp
  //       // console.log(this.dataProfil);
  //     }
  //   })    
  // };

}
