import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { PrincipalPage } from '../principal/principal.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  mdl_correo: string = ""
  mdl_password: string = "";
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  token: string = '123';
  data: any;



  constructor(private router:Router, 
              private api: ApiService, 
              private loadingController: LoadingController, 
              private toastController: ToastController, public navCtrl: NavController) { 

                
              }

      

  ngOnInit() { 

  if (window.localStorage.getItem("data" ) != null) {
      this.router.navigate(['principal'])
   } else {
    
  localStorage.clear();
       
   }

    
    
                
    
    
    

  
  }


  async UsuarioLogin() {

    let that = this;
    this.loadingController.create({
      message: 'Validando credenciales',
      spinner: 'lines-sharp'
    }).then(async res => {
      res.present();


    let data = await that.api.UsuarioLogin(
        that.mdl_correo, that.mdl_password);

    if(data['result'] === 'LOGIN OK'){
      console.log('Correo: ' + this.mdl_correo)
      console.log('contraseña actual: ' + this.mdl_password);

      localStorage.setItem('data', JSON.stringify(that.mdl_correo));

    let extras: NavigationExtras = {
      state: {
        pass: this.mdl_correo,
      }
    }
    this.router.navigate(['principal'], extras);
    }else {
      this.mostrarMensaje('Datos de acceso incorrectos')
    }
        
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

  











  






















