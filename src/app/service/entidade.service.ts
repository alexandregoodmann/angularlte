import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { Entidade } from '../model/entidade';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  private behavio = new BehaviorSubject<Entidade[]>(new Array());
  selecionados = this.behavio.asObservable();

  constructor(private apiService: ApiService) { }

  public addSelecionados(selecionados: Entidade[]): void {
    this.behavio.next(selecionados);
  }

  public getEntidades(): Entidade[] {
    let entidades: Entidade[] = new Array<Entidade>();
    this.apiService.getEntidades().subscribe((data: Array<object>) => {
      data.forEach(item => {
        let ent: Entidade = new Entidade();
        ent.identidade = item[0];
        ent.nome = item[1];
        ent.idlocalidade = item[2];
        ent.cidade = item[3];
        ent.estado = item[4];
        ent.pais = item[5];
        ent.moeda = item[6];
        ent.resumo = item[1] + ', ' + item[3] + ', ' + item[4] + ', ' + item[5]
        entidades.push(ent);
      })
    });
    return entidades;
  }

}
