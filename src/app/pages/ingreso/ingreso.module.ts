import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoPageRoutingModule } from './ingreso-routing.module';

import { IngresoPage } from './ingreso.page';
import { BarraComponent } from 'src/app/components/barra/barra.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoPageRoutingModule
  ],
  declarations: [IngresoPage, BarraComponent]
})
export class IngresoPageModule {}
