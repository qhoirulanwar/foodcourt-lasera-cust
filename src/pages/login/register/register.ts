import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Response } from "@angular/http";

import { AppProvider } from '../../../providers/app/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: Http, 
    public app: AppProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  loginPage() {
    this.navCtrl.pop();

  }

  signUp() {
    console.log(this.user);


    if (this.user.email == null || this.user.nama == null || this.user.telp == null || this.user.birth == null || this.user.gender == null) {
      console.log('lengkapi data');
      
    } else {

      if (this.user.password !== this.user.confirmPassword) {
        this.alertCtrl.create({
          message: "Kata sandi anda tidak sama",
          buttons: [{
            text: "OK",
            handler: () => {
            }
          }] 
        }).present();
      } else {
        this.signupProses()
      }
      
    };

  };

  signupProses() {
    this.http.post(this.app.url+'/auth/register',this.user)
      .subscribe(
        (res: Response) => {
          console.log(res.json());
          

          if (res.status == 201 ) {
            const alert = this.alertCtrl.create({
              title: 'Registrasi Berhasil',
              subTitle: 'Alamat email anda sudah terdaftar, silahkan login',
              buttons: [
                {
                  text: 'Agree',
                  handler: () => {
                    console.log('Agree clicked');
                  }
                }
              ]
            });
            alert.present();
          }

          
        },
        (error) => {
          this.app.networkError();
        }
      )
  };

}
