import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';

const appRoutes: Routes = [
  { path: 'pesquisar', component: PesquisarComponent}
];


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [PesquisarComponent]
})
export class ViagemModule { }
