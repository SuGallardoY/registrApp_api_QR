import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterState } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoginPage  } from '../login/login.page';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {


  mdl_correo: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  arreglo: string[];
  mdl_id_clase:string = '';



  isLoggedIn: boolean = false;



  constructor(
    private router: Router,
    private loadingController: LoadingController, 
    private api: ApiService
    ) { 

      if (localStorage.getItem('data')) {
        
        this.mdl_correo = JSON.parse(localStorage.getItem('data'));
        
        
      } 

    }

  ngOnInit() {
  

    try {
      this.mdl_correo = this.router.getCurrentNavigation().extras.state.pass;
    } catch (error) {
      this.router.navigate(['principal'])
      
      
    }

    this.UsuarioObtenerNombre();

    

  
  }

  logOut(){                 
    this.router.navigate(['login']);
    localStorage.clear();
    location.reload();
 
  }

  async UsuarioObtenerNombre() {
    let that = this;
    this.loadingController.create({
      message: 'Obteniendo información...',
      spinner: 'lines-sharp'
    }).then(async res => {
      res.present();

      let data = await that.api.UsuarioObtenerNombre(that.mdl_correo);
      

      this.mdl_nombre = data['result'][0].NOMBRE
      console.log('Nombre: ' + this.mdl_nombre)

      this.mdl_apellido = data['result'][0].APELLIDO
      console.log('APellido: '+ this.mdl_apellido)

      res.dismiss();
    })

    
  }

  enviarMail() {
    console.log("traer correo");
    let extras: NavigationExtras = {
      state: {
        pass: this.mdl_correo,
      }
    }
    this.router.navigate(['editar'], extras);
    
  }


  //almacenar asistencia 

  async leerQR(id) {
    document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();
   
   if (result.hasContent) {
     id = result.content.split('|');
     id = this.arreglo[1]
     console.log(id)
     
 }

    document.querySelector('body').classList.remove('scanner-active');


 };

  async AsistenciaAlmacenar() {

    let that = this;
    this.loadingController.create({
       message: 'Validando credenciales',
      spinner: 'lines-sharp'
     }).then(async res => {
       res.present();

    this.leerQR(that.mdl_id_clase);

    let data = await that.api.AsistenciaAlmacenar(
        that.mdl_correo, that.mdl_id_clase);


    if(data['result'] === 'OK'){
      console.log(' todo ok' )
    }else {
      console.log(' algo falló' )
    }
        
    res.dismiss();

  })
    
    }

  


}