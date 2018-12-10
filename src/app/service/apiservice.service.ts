import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  API_URL = 'http://localhost:8080/viagem-api';

  constructor(private httpClient: HttpClient) { }

  getContacts() {
    return this.httpClient.get('${this.API_URL}/entidade/pesquisar');
  }
}
