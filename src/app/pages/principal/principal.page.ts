import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterState } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { LoginPage  } from '../login/login.page';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { TouchSequence } from 'selenium-webdriver';




@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {


  mdl_correo: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  //variables para asistencia
  arreglo: string[];
  mdl_id_clase:string = '';
  mdl_nombre_clase: string = ''

  //ALERTA

  handlerMessage = '';
  roleMessage = '';



  isLoggedIn: boolean = false;



  constructor(
    private router: Router,
    private loadingController: LoadingController, 
    private api: ApiService,
    private alertController: AlertController,
    private toastController: ToastController, public navCtrl: NavController
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

  async leerQR() {

    
    document.querySelector('body').classList.add('scanner-active');


   await BarcodeScanner.checkPermission({ force: true });

      BarcodeScanner.hideBackground();

       const result = await BarcodeScanner.startScan();
   
    if (result.hasContent) {
        
        let contenido = result.content
        this.arreglo = contenido.split('|'); //le asignamos a un arreglo el resultado de lo que devuelve el QR

        if (this.mdl_id_clase != this.arreglo[0]){  
          this.mdl_id_clase= this.arreglo[0]
          //capturamos el id de la clase Y le asignamos el id de la clase a la variable

          this.mostrarMensaje('Asistencia almacenada correctamente')
        } else {
          this.mostrarMensaje('Lo sentimos, la asistencia ya almacenada anteriormente')
        }
        
         
    
              
     }

     document.querySelector('body').classList.remove('scanner-active');

   


  }

  async AsistenciaAlmacenar() {

    let that = this;
    this.loadingController.create({
       message: 'Abriendo cámara',
      spinner: 'lines-sharp'
     }).then(async res => {
       res.present();

       this.router.navigate(['qr'])


    this.leerQR(); //llamamos la función del QR

    console.log("El id de la clases: ",  that.mdl_id_clase)//como prueba
    console.log("El nombre de la clase: ",  that.mdl_nombre_clase)//como prueba
    


    let data = await that.api.AsistenciaAlmacenar(
        that.mdl_correo, that.mdl_id_clase);

        console.log(data )

        console.log(this.mdl_correo)
        console.log(this.mdl_id_clase)


    if(data['result'][0].RESPUESTA === 'OK'){

      console.log(' todo ok' )


    }else {
      console.log(' algo falló' )

  
    }

    res.dismiss();

    this.router.navigate(['principal'])


  })
    
    }



    //alertas para la asistencia

    


  
    async mostrarMensaje(mensaje) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 3000,
        position: 'bottom'
      });
  
      await toast.present();
    }


}
