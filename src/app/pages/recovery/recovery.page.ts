import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController} from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';



@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
  
})
export class RecoveryPage implements OnInit {

  constructor(private router: Router, public navCtrl: NavController, private db:DbService) { }

  mdl_pass: string = '';


  ngOnInit() {
    
  }

  traerPass(){
    console.log("traer pass");
    let extras: NavigationExtras = {
      state: {
        pass: this.mdl_pass,
      }
    }
    this.router.navigate(['login'], extras);
    console.log(this.mdl_pass);
    this.db.mdl_pass = this.mdl_pass;
    
  }





}


