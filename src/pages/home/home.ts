import { Component } from '@angular/core';
import { Http, Response } from "@angular/http";
import { NavController, IonicPage } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  respon: object

  constructor(public navCtrl: NavController, public app: AppProvider, public http:Http) {

  }

  test() {
    this.http.post('http://192.168.43.75:3000/v1/auth/login', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe(
        (res: Response) => {
          console.log(res.json())
          this.respon = res.json()
          
        },
        (error) => {
          console.log('error');
          
        })
  }

}
