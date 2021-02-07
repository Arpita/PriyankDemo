import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  saveApartment(data) {
    return this.http.post(`http://localhost:3000/saveApartment`, data);
  }

  getAllUnits() {
    return this.http.get(`http://localhost:3000/getAllUnits`);
  }
}
