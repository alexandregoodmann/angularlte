import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/model/funcionario';
import { ApiService } from 'src/app/service/api.service';
import { EntidadeService } from 'src/app/service/entidade.service';
import { Entidade } from 'src/app/model/entidade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { DateAdapter } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {

  funcionarios: Funcionario[] = new Array<Funcionario>();
  selecionados: Entidade[];
  viagemForm: FormGroup;
  selection = new SelectionModel<Funcionario>(true, []);

  constructor(
    public snackBar: MatSnackBar,
    private adapter: DateAdapter<any>,
    private funcionarioService: FuncionarioService,
    private entidadeService: EntidadeService,
    private formBuilder: FormBuilder) { }

  private createFormBuilder() {
    this.viagemForm = this.formBuilder.group({
      saidaControl: ['', Validators.required],
      retornoControl: ['', Validators.required]
    });
  }

  get f() {
    return this.viagemForm.controls;
  }

  ngOnInit() {

    this.adapter.setLocale('pt');
    this.createFormBuilder();

    //funcionarios
    this.funcionarios = this.funcionarioService.getFuncionarios();
    console.log(this.funcionarios)

    //entidades selecionadas
    this.entidadeService.selecionados.subscribe(data => {
      this.selecionados = data;
    });
  }

  public remover(entidade: Entidade): void {
    let index = this.selecionados.indexOf(entidade);
    this.selecionados.splice(index, 1);
  }

  salvar() {

    //validar entidade
    if (this.selecionados.length == 0) {
      this.snackBar.open('Você precisa escolher ao menos um cliente ou evento', 'Atenção!', {
        duration: 3000,
      });
      return;
    }

    //validar periodo
    let saida: Date = this.f.saidaControl.value;
    let retorno: Date = this.f.retornoControl.value;
    if (retorno <= saida) {
      this.snackBar.open('A data de retorno deve ser maior que a data de saída', 'Atenção!', {
        duration: 3000,
      });
      return;
    }

    //validar funcionario selecionado
    if (this.selection.selected.length == 0) {
      this.snackBar.open('Você precisa selecionar ao menos um funcionário', 'Atenção!', {
        duration: 3000,
      });
      return;
    }
  }

}
