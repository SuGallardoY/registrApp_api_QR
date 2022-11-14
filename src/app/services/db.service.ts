import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  validador: boolean = false;
  mdl_pass: string='1234';
  mdl_correo: string = "user";
  new_pass: String ='';

  constructor(private router: Router, private sqlite: SQLite) { 
    this.sqlite.create({
      name:"data.db"                /*Creación de BD y Tabla para almacenar usuarios*/
    }).then((db:SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS USUARIO(CORREO VARCHAR(50), '
        + 'PASSWORD VARCHAR(50), NOMBRE VARCHAR(50), '
        + 'APELLIDO VARCHAR(50)', []).then(() => {
          console.log('BD CREADA');
      })
    })
  }

  canActivate() {                   /* carga de inicio */
    if (this.validador){
      return true;
    } else {
    this.router.navigate(['login']);
    return false;
  }
  }
                                    /* registro de usuario en BD */
  registrarPersona(correo, password, nombre, apellido) {
    this.sqlite.create({
      name: "data.db"
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO PERSONA VALUES(?,?,?,?)',
      [correo, password, nombre, apellido]).then(() => {
          console.log('Usuario Registrado');
        })
      });
  }

  cambioPassDB(password){            /* Cambio de password en BD realizando update a la DATA */
    this.sqlite.create({
      name: "datos.db"
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE FROM PERSONA WHERE CORREO = ?',
      [password]).then(() => {
          console.log('Contraseña ha sido cambiada exitosamente');
        })
      });
  }

  validarCredenciales(correo, pass){  /* Validación de usuario y correo */
    if (correo == this.mdl_correo && pass == this.mdl_pass) {
      this.validador = true;
      this.router.navigate(['principal']);
      return true;
    } else if(pass == this.new_pass){ /* segunda validación como "newpass" en caso de cambio */
      this.validador = true;
      this.router.navigate(['principal']);
      return false;
    } else{                           /* no validados */
      return false;
    }
  }
  

}
