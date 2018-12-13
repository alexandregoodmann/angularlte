import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { ListaFuncionarioComponent } from './lista-funcionario/lista-funcionario.component';
import { ListaEntidadeComponent } from './pesquisar/lista-entidade/lista-entidade.component';

const appRoutes: Routes = [
  { path: 'pesquisar', component: PesquisarComponent },
  { path: 'funcionarios', component: ListaFuncionarioComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    PesquisarComponent,
    ListaFuncionarioComponent,
    ListaEntidadeComponent],
  providers: []
})
export class ViagemModule { }
