import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Entidade } from 'src/app/model/entidade';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  //autocomplete
  private entidades: Array<object> = [];
  options: string[] = new Array();

  //entidade selecionada
  private selecionados: Entidade[] = new Array<Entidade>();

  adicionar() {
    let ent: Entidade = new Entidade;
    ent.entidade = this.myControl.value;
    this.selecionados.push(ent);
    alert(this.selecionados);
  }

  getEntidades() {
    this.apiService.getEntidades().subscribe((data: Array<object>) => {
      this.entidades = data;
      this.entidades.forEach(item => {
        this.options.push(item[1] + ', ' + item[3] + ', ' + item[4] + ', ' + item[5]);
      })
    });
  }

  ngOnInit() {
    this.getEntidades();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}