import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private motivoService: MotivoService,
    private formBuilder: FormBuilder) { }

  //outros
  showForm: boolean = false;
  pesquisarForm: FormGroup;

  //autocomplete entidade
  entidades: Entidade[] = new Array<Entidade>();
  selecionados: Entidade[] = new Array<Entidade>();
  filterEntidade: Observable<Entidade[]>;

  //autocomplete motivo
  motivos: Motivo[] = new Array<Motivo>();
  filterMotivo: Observable<Motivo[]>;

  private createFormBuilder() {
    this.pesquisarForm = this.formBuilder.group({
      entidadeControl: ['', Validators.required],
      motivoControl: ['', Validators.required]
    });
  }

  get f() {
    return this.pesquisarForm.controls;
  }

  adicionar() {

    //validate entidade    
    if (this.entidades.filter(opt => opt.resumo.includes(this.f.entidadeControl.value)).length == 0) {
      this.f.entidadeControl.setValue('');
      this.snackBar.open('Este cliente ou evento não é válido', 'Atenção!', {
        duration: 3000,
      });
      return;
    }

    //validar motivo
    if (this.motivos.filter(opt => opt.motivo.includes(this.f.motivoControl.value)).length == 0) {
      this.f.motivoControl.setValue('');
      this.snackBar.open('Este motivo não é válido', 'Atenção!', {
        duration: 3000,
      });
      return;
    }

    let entidade = this.f.entidadeControl.value;
    let selEntidade = new Entidade();

    //entidade selecionada
    this.entidades.filter(option => option.resumo.includes(entidade)).forEach(sel => {
      selEntidade = sel;
    });

    //motivo selecionadoif
    this.motivos.filter(option => option.motivo.includes(this.f.motivoControl.value)).forEach(sel => {
      selEntidade.motivo = sel;
    });

    if (this.selecionados.indexOf(selEntidade) > 0) {
      this.snackBar.open('Este cliente ou evento já foi adicionado', 'Atenção!', {
        duration: 3000,
      });
    } else {
      this.selecionados.push(selEntidade);
      this.entidadeService.addSelecionados(this.selecionados);
    }

    this.f.entidadeControl.setValue('');
    this.f.motivoControl.setValue('');
    this.showForm = true;
  }

  ngOnInit() {

    this.createFormBuilder();

    //entidades
    this.entidades = this.entidadeService.getEntidades();
    this.filterEntidade = this.f.entidadeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterEntidade(value))
      );

    //motivo
    this.motivos = this.motivoService.getMotivos();
    this.filterMotivo = this.f.motivoControl.valueChanges
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