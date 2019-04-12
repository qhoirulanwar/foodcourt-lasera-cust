import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { cekLoginUser } from './cekLoginUser';

@NgModule({
  declarations: [
    cekLoginUser,
  ],
  imports: [
    IonicPageModule.forChild(cekLoginUser),
  ],
})
export class cekLoginUserModule {}
