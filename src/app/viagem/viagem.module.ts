import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { ViagemComponent } from './viagem/viagem.component';

const appRoutes: Routes = [
  { path: 'pesquisar', component: PesquisarComponent },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    PesquisarComponent,
    ViagemComponent],
  providers: []
})
export class ViagemModule { }
