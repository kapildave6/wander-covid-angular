import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../constants.local';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private http: HttpClient
  ) { }

  getStates() {
    console.log("StateService:getStates");

    return this.http.get(`${environment.API_URL}/states`);
  }
}