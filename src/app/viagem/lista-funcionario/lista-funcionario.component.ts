import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Funcionario } from 'src/app/model/funcionario';

@Component({
  selector: 'app-lista-funcionario',
  templateUrl: './lista-funcionario.component.html',
  styleUrls: ['./lista-funcionario.component.css']
})
export class ListaFuncionarioComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  funcionarios: Funcionario[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getFuncionarios();
  }

  getFuncionarios() {
    this.apiService.getFuncionarios().subscribe((data: Funcionario[]) => {
      this.funcionarios = data;
      console.log(data);
    });
  }


}
