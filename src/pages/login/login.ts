import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http, Response } from "@angular/http";
import { Storage } from '@ionic/storage';
import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  user: object = {};
  datalogin = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: Http, 
    public storage : Storage, 
    public app: AppProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.app.networkChek();
  }

  login() {
    console.log(this.user);

    this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 1500,
      dismissOnPageChange: true
    }).present()

    this.http.post(this.app.url+'/auth/login',this.user)
    .subscribe(
      (res: Response) => {
        // user password dont match code 203
        if (res.status == 203) {
          this.toastCtrl.create({
            message: res.json().message,
            duration: 3000,
            showCloseButton: true
          }).present();
          return;
        } 
        else {
          this.storage.set("userLoginInfo", res.json().user)
          this.navCtrl.setRoot('SideNavPage')
        }
      },
      (error) => {
        this.app.networkError();
      }
    )

  };

  register() {
    this.navCtrl.push('RegisterPage')
  }

}
