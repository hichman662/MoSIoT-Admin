import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Session } from '../models/User/session';
import { User } from '../models/User/user';
import { UserAdmin } from '../models/User/user-admin';
import { UserLogin } from '../models/User/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  adminLogin(data: UserLogin){
    return this.http.post<UserLogin>(environment.base_url + '/AdminAnonimous/Login',data);
  }

  getAllAdminUsers(){
    return this.http.get<UserAdmin[]>(environment.base_url + 'Admin/ReadAll');
  }

  getAllUsers(){
    return this.http.get<User[]>(environment.base_url + '/User/ReadAll');
  }

  getAdminUser(){
    return this.http.get<UserAdmin>(environment.base_url + 'Admin');
  }

  getTiempoTotalSesiones(id: number){
    return this.http.post<number>(environment.base_url + '/User/User_dameTiempoTotalSesiones?p_oid=' + id, null);
  }

  getAllUserActions(id: number){
    return this.http.get(environment.base_url + '/UserAction/Actions?idUser=' + id);
  }

  getTotalUserActions(id: number){
    return this.http.get<number>(environment.base_url + '/UserAction/DameTotalAccionesUsuario?p_iduser=' + id);
  }

  getAllUserSessions(id: number){
    return this.http.get<Session[]>(environment.base_url + '/UserSession/Sessions?idUser=' + id);
  }

  getTotalUserSessions(id: number){
    return this.http.get<number>(environment.base_url + '/UserSession/DameNumSessionsByUser?p_iduser=' + id);
  }

  createAdminUser(data: UserAdmin){
    return this.http.post<UserAdmin>(environment.base_url + '/Admin/New_', data);
  }

  updateAdminUser(data: UserAdmin){
    return this.http.put(environment.base_url + '/Command/Modify', data);
  }

  deleteAdminUser() {
    return this.http.delete(environment.base_url + '/Goal/Destroy');
  }
}
