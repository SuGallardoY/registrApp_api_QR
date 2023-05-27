import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  username: string | null= '';


  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username') || null;
  


  }
}
