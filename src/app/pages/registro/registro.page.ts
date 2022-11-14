import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  mdl_correo: string = '';
  mdl_password: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  constructor(private router: Router, private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private db: DbService) { }

  ngOnInit() {        /* carga inicial */
    this.loadingController.create({
      message: '',
      spinner: 'lines-sharp'
    }).then(res => {
      res.dismiss()
    })
  }

  almacenar() {
    this.db.almacenarPersona(this.mdl_correo, this.mdl_password,
      this.mdl_nombre, this.mdl_apellido);
      console.log('Persona Registrada');
  }
  navegar() {
    this.router.navigate(['Principal']);
  }

  async usuarioAlmacenar() {
    let that = this;
    this.loadingController.create({
      message: 'Almacenando Persona',
      spinner: 'lines-sharp'
    }).then(async res => {
      res.present();

      let data = await that.api.PersonaAlmacenar(
        that.mdl_correo, that.mdl_password, 
        that.mdl_nombre,  that.mdl_apellido);

        console.log('Persona almacenada1')


      console.log(data['result']);
      res.dismiss();
      
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
