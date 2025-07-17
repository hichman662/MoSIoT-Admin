import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sweet-alerts',
  templateUrl: './sweet-alerts.component.html',
  styleUrls: ['./sweet-alerts.component.scss']
})
export class SweetAlertsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginRequired(){
    Swal.fire({
      title: 'Warning',
      text: '',
      icon: 'warning',
      html: 'To use all the functions of the application you need to <a href="/Login">Login</a>.',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Later',
      showCloseButton: true
    });
  }

  readError(objetcToLoad:string ,error:string){
    Swal.fire({
      title: 'Error',
      text: 'A problem occurred while loading ' + objetcToLoad + '. Error: ' + error,
      icon: 'error',
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  createError(objectToCreate:string, error:string){
    Swal.fire({
      title: 'Error',
      text: 'A problem occurred while trying to create ' + objectToCreate + '. Error: ' + error,
      icon: 'error',
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  createSuccess(objectToCreate: string){
    Swal.fire({
      title: 'New ' + objectToCreate + ' successfully created',
      icon: 'success',
      timer: 3000,
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  updateError(error:string){
    Swal.fire({
      title: 'Error',
      text: 'A problem occurred while trying to save changes. Error: ' + error,
      icon: 'error',
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  updateSuccess(){
    Swal.fire({
      title: 'Changes saved',
      icon: 'success',
      timer: 2000,
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  removeSuccess(objectToRemove:string){
    Swal.fire({
      title: objectToRemove + ' successfully removed',
      icon: 'success',
      timer: 3000,
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  removeError(objectToRemove:string, error:string){
    Swal.fire({
      title: 'Error',
      text: 'A problem occurred while removing ' + objectToRemove + '. Error: ' + error,
      icon: 'error',
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  loginSuccess(){
    Swal.fire({
      title: 'Successful login',
      icon: 'success',
      timer: 2500,
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }
  
  loginError(error:string){
    Swal.fire({
      title: 'Error',
      text: 'A problem occurred while trying to login. Error: ' + error,
      icon: 'error',
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }

  logOutSuccess(){
    Swal.fire({
      title: 'Successful logout',
      icon: 'success',
      timer: 2500,
      confirmButtonColor: '#0d6efd',
      showCloseButton: true
    });
  }
}
