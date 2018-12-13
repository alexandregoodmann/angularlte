import { Component, OnInit } from '@angular/core';
import { EntidadeService } from 'src/app/service/entidade.service';
import { Entidade } from 'src/app/model/entidade';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-entidade',
  templateUrl: './lista-entidade.component.html',
  styleUrls: ['./lista-entidade.component.css']
})
export class ListaEntidadeComponent implements OnInit {

  displayedColumns: string[] = ['resumo'];
  private selecionados: Entidade[];
  //dataSource = new MatTableDataSource<Entidade[]>();

  constructor(private entidadeService: EntidadeService) { }

  ngOnInit() {
    this.entidadeService.selecionados.subscribe(data => {
      this.selecionados = data;
    });
  }

}
