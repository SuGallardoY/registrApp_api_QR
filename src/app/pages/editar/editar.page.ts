import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  mdl_correo: string = '';
  mdl_password_new: string = '';
  mdl_password_actual: string ='';



  constructor(private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController, 
              private api: ApiService) { 

      if (localStorage.getItem('data')) {
        this.mdl_correo = JSON.parse(localStorage.getItem('data'));
      } 
    }

    
  ngOnInit() {

    try {
      this.mdl_correo = this.router.getCurrentNavigation().extras.state.pass;
    } catch (error) {
      this.router.navigate(['editar'])
    } 
    this.showMail();   
  }



  async UsuarioModificarContrasena() {
    let that = this;

    this.loadingController.create({
      message: 'actualizando datos',
      spinner: 'lines-sharp'
    }).then(async res => {
      res.present();

      let data = await that.api.UsuarioModificarContrasena(
        that.mdl_correo, that.mdl_password_new, that.mdl_password_actual);

        console.log(data['result']);
        console.log('Contraseña nueva: ' + this.mdl_password_new)  

        if (data['result'] === 'OK') {
          that.mostrarMensaje('Cambio realizado correctamente');

          let extras: NavigationExtras = {
            state: {
              pass: this.mdl_correo,
            }
          }
          this.router.navigate(['principal'], extras);
          
          
        } 
        res.dismiss();
        console.log(data)
        this.router.navigate(['principal']);
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


  async showMail() {
    let that = this;
    this.loadingController.create({
      message: 'Obteniendo información...',
      spinner: 'lines-sharp'
    }).then(async res => {
      res.present();

      let data = await that.api.UsuarioObtenerNombre(that.mdl_correo);
      console.log(data['result']);


      res.dismiss();
    })

    
  }













}
