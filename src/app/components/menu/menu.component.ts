import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlertsComponent } from '../shared/sweet-alerts/sweet-alerts.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggeado:boolean = false;
  token!:string;

  constructor(public dialog: MatDialog, private router: Router, private sweetAlert: SweetAlertsComponent) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token')!;
    if(this.token != undefined && this.token != ""){
      this.loggeado = true;
    }
    else{
      this.loggeado = false;
    }
  }

  loginView(){
    this.router.navigateByUrl("Login");
  }

  logOut(){
    Swal.fire({
      title: 'Do you want to log out?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#0d6efd',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.setItem('token','');
        this.sweetAlert.logOutSuccess();
        window.location.reload();
      }
    });
  }
}