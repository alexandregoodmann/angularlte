import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/model/funcionario';
import { ApiService } from 'src/app/service/api.service';
import { EntidadeService } from 'src/app/service/entidade.service';
import { Entidade } from 'src/app/model/entidade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionarioService } from 'src/app/service/funcionario.service';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {

  funcionarios: Funcionario[] = new Array<Funcionario>();
  selecionados: Entidade[];
  viagemForm: FormGroup;

  constructor(
    public snackBar: MatSnackBar,
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
    console.log(this.funcionarios);
    //validar funcionario selecionado
    if (this.funcionarios.filter(option => option.selecionado === true).length == 0) {
      this.snackBar.open('Você precisa selecionar ao menos um funcionário', 'Atenção!', {
        duration: 3000,
      });
      return;
    }
    alert('agora tu veio')
  }

}
