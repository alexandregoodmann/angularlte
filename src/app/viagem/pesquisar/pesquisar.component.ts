import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entidade } from 'src/app/model/entidade';
import { EntidadeService } from 'src/app/service/entidade.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  constructor(private entidadeService: EntidadeService) { }

  //autocomplete
  entidades: Entidade[] = new Array<Entidade>();
  selecionados: Entidade[] = new Array<Entidade>();
  myControl = new FormControl();
  filteredOptions: Observable<Entidade[]>;

  adicionar() {
    let selecionado = this.myControl.value;
    this.entidades.filter(option => option.resumo.includes(selecionado)).forEach(sel => {
      this.selecionados.push(sel);
    });
    this.entidadeService.addSelecionados(this.selecionados);
  }

  ngOnInit() {
    this.entidades = this.entidadeService.getEntidades();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Entidade[] {
    const filterValue = value.toLowerCase();
    return this.entidades.filter(option => option.resumo.toLowerCase().includes(filterValue));
  }

}