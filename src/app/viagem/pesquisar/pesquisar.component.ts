import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entidade } from 'src/app/model/entidade';
import { EntidadeService } from 'src/app/service/entidade.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Motivo } from 'src/app/model/motivo';
import { MotivoService } from 'src/app/service/motivo.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private entidadeService: EntidadeService,
    private motivoService: MotivoService) { }

  //autocomplete entidade
  entidades: Entidade[] = new Array<Entidade>();
  selecionados: Entidade[] = new Array<Entidade>();
  entidadeControl = new FormControl();
  filterEntidade: Observable<Entidade[]>;

  //autocomplete motivo
  motivos: Motivo[] = new Array<Motivo>();
  motivo: Motivo = new Motivo();
  motivoControl = new FormControl();
  filterMotivo: Observable<Motivo[]>;

  adicionar() {

    //validar entidade ou motivo em branco

    //validar se a entidade já está na lista

    /*
    if (entidade == '') {
      this.snackBar.open('Por favor informe o cliente ou evento', 'Atenção!', {
        duration: 3000,
      });
      return;
    }*/
    
    let entidade = this.entidadeControl.value;
    let selecionado = new Entidade();

    this.entidades.filter(option => option.resumo.includes(entidade)).forEach(sel => {
      selecionado = sel;
      //this.selecionados.push(sel);
    });

    if (this.selecionados.indexOf(selecionado) > 0) {
      this.snackBar.open('Este cliente ou evento já foi adicionado', 'Atenção!', {
        duration: 3000,
      });
    } else {
      this.selecionados.push(selecionado);
      this.entidadeService.addSelecionados(this.selecionados);
    }

    //motivo selecionado
    this.motivos.filter(option => option.motivo.includes(this.motivoControl.value)).forEach(sel => {
      this.motivo = sel;
    });

    this.entidadeControl.setValue('');
    this.motivoControl.setValue('');
  }

  private addMotivo(){
  }

  ngOnInit() {

    //entidades
    this.entidades = this.entidadeService.getEntidades();
    this.filterEntidade = this.entidadeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterEntidade(value))
      );

    //motivo
    this.motivos = this.motivoService.getMotivos();
    this.filterMotivo = this.motivoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterMotivo(value))
      );

  }

  private _filterEntidade(value: string): Entidade[] {
    const filterValue = value.toLowerCase();
    return this.entidades.filter(option => option.resumo.toLowerCase().includes(filterValue));
  }

  private _filterMotivo(value: string): Motivo[] {
    const filterValue = value.toLowerCase();
    return this.motivos.filter(option => option.motivo.toLowerCase().includes(filterValue));
  }

}