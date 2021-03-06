import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  private base_url: string = 'http://localhost:8080/viagem-api';

  getEntidades() {
    return this.httpClient.get(this.base_url + '/entidade/pesquisar');
  }

  getFuncionarios(){
    return this.httpClient.get(this.base_url + '/funcionario');
  }

  getMotivos(){
    return this.httpClient.get(this.base_url + '/motivo');
  }

}
