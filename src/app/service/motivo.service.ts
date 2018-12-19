import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Motivo } from '../model/motivo';

@Injectable({
  providedIn: 'root'
})
export class MotivoService {

  constructor(private apiService: ApiService) { }

  public getMotivos(): Motivo[] {
    let motivos: Motivo[] = new Array<Motivo>();
    this.apiService.getMotivos().subscribe((data: Array<Motivo>) => {
      data.forEach(mot => {
        motivos.push(mot);
      })
    });
    return motivos;
  }
}
