import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  mdl_correo: string = '';
  mdl_password: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  constructor(private router: Router, private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.loadingController.create({
      message: '',
      spinner: 'lines-sharp'
    }).then(res => {
      res.dismiss()
    })
  }


  async UsuarioAlmacenar() {
    let that = this;
    this.loadingController.create({
      message: 'Almacenando Persona',
      spinner: 'lines-sharp'
    }).then(async res => {
      res.present();

    let data = await that.api.UsuarioAlmacenar(
        that.mdl_correo, that.mdl_password, 
        that.mdl_nombre,  that.mdl_apellido);

    

      if (data['result'][0].RESPUESTA === 'OK') {
        that.mostrarMensaje('Persona Almacenada Correctamente')
      } else {
        that.mostrarMensaje('Persona no almacenada');
      }

      
      
      res.dismiss();
      console.log(data)
    })
    
  }

  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  
}
