import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Funcionario } from '../model/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private apiService: ApiService) { }

  public getFuncionarios(): Funcionario[] {
    let funcionarios: Funcionario[] = new Array<Funcionario>();
    this.apiService.getFuncionarios().subscribe((data: Array<Funcionario>) => {
      data.forEach(item => {
        item.selecionado = null;
        funcionarios.push(item);
      })
    });
    return funcionarios;
  }
}
