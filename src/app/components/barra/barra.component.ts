import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit {

  @Input() titulo: String;
color: string =''
  constructor() { }

  ngOnInit() {}
  Activate(){
    if(this.color == ''){
      this.color = "warning";
    }else{
      this.color = '';

    }
  }
}