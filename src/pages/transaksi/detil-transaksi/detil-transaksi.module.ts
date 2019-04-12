import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetilTransaksiPage } from './detil-transaksi';

@NgModule({
  declarations: [
    DetilTransaksiPage,
  ],
  imports: [
    IonicPageModule.forChild(DetilTransaksiPage),
  ],
})
export class TransaksiPageModule {}
