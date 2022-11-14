import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPageRoutingModule } from './recovery-routing.module';

import { RecoveryPage } from './recovery.page';
import { BarraComponent } from 'src/app/components/barra/barra.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoveryPageRoutingModule
  ],
  declarations: [RecoveryPage, BarraComponent]
})
export class RecoveryPageModule {}
