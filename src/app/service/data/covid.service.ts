import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../constants.local';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  
  getCovidSummary(apiBody) {
    return this.http.post(`${environment.API_URL}/covid/summary`, apiBody);
  }

  constructor(
    private http: HttpClient
  ) { }

  getCovidDetails(apiBody) {
    return this.http.post(`${environment.API_URL}/covid/list`, apiBody);
  }
}
