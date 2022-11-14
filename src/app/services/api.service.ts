import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rutaBase: string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php'
  
  validador: boolean = false;


  constructor(private http: HttpClient, private router: Router) { }

  UsuarioAlmacenar(correo, contrasena, nombre, apellido) {
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioAlmacenar",
        parametros: [correo, contrasena, nombre, apellido]
      }).toPromise())
    })
  }

 UsuarioLogin(correo: string, contrasena: string) { 

    this.validador = true;

  
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioLogin",
        parametros: [correo, contrasena]
      }).toPromise())
    }) 
  } 


  UsuarioObtenerNombre(correo: string){
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.get(that.rutaBase + '?nombreFuncion=UsuarioObtenerNombre&correo=' + correo).toPromise())
    })

  } 

  UsuarioModificarContrasena(correo, contrasenaNueva, contrasenaActual) {
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.patch(that.rutaBase, {
        nombreFuncion: "UsuarioModificarContrasena",
        parametros: [correo, contrasenaNueva, contrasenaActual]
      }).toPromise())
    })
  } 


 

   
  canActivate() {                   
    if (localStorage.getItem('data') !== null ){
      return true;
    } else {
    this.router.navigate(['login']);
    return false;
  }
  }












}

























