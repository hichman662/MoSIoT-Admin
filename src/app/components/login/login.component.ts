import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { UserLogin } from 'src/app/models/User/user-login';
import { UserService } from 'src/app/services/user.service';
import { SweetAlertsComponent } from '../shared/sweet-alerts/sweet-alerts.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user!:UserLogin;
  token!:any;

  loginForm = this.fb.group({
    email:['',Validators.required],
    password:['', Validators.required]
  })

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private sweetAlert: SweetAlertsComponent) { }

  ngOnInit(): void { }

  login() {
    this.user = {
      Email: this.loginForm.get("email")?.value,
      Pass: this.loginForm.get("password")?.value
    };

    this.userService.adminLogin(this.user).subscribe({
      next : result =>{
        this.token = result;
      },
      error : error => {
        this.sweetAlert.loginError(error);
      },
      complete : () => {
        sessionStorage.setItem('token',this.token);
        window.location.reload();
        this.router.navigateByUrl("Home");
        this.sweetAlert.loginSuccess();
      }
    });
  }
}
