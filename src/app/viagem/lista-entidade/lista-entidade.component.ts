import { Component, OnInit } from '@angular/core';
import { EntidadeService } from 'src/app/service/entidade.service';
import { Entidade } from 'src/app/model/entidade';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoService } from 'src/app/service/motivo.service';
import { Motivo } from 'src/app/model/motivo';

@Component({
  selector: 'app-lista-entidade',
  templateUrl: './lista-entidade.component.html',
  styleUrls: ['./lista-entidade.component.css']
})
export class ListaEntidadeComponent implements OnInit {

  displayedColumns: string[] = ['resumo'];
  private selecionados: Entidade[];

  constructor(
    private entidadeService: EntidadeService,
    private motivoService: MotivoService) { }

  ngOnInit() {
    this.entidadeService.selecionados.subscribe(data => {
      this.selecionados = data;
    });
  }

  public remover(entidade: Entidade): void {
    let index = this.selecionados.indexOf(entidade);
    this.selecionados.splice(index, 1);
  }

}
