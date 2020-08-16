import { Injectable } from '@angular/core';
import { environment } from '../../constants.local';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( private http: HttpClient) { }

  registerUser(user) {
      let registrationUrl = `${environment.API_URL}/user/register`
      
      return this.http.post(registrationUrl, user);
  }

  authenticate(user) {

    let loginUrl = `${environment.API_URL}/authenticate`
    
    return this.http.post(loginUrl, user);
  }

  isUserLoggedIn() {
    if (sessionStorage.getItem('token') != null) {
      return true;
    }
    return false
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
