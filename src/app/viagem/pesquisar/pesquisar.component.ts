import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.css']
})
export class PesquisarComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  private entidades: Array<object> = [];

  getEntidades(){
    this.apiService.getEntidades().subscribe((data:  Array<object>) => {
      this.entidades  =  data;
      console.log(data);
  });
  }

  ngOnInit() {
    this.getEntidades();
  }

}
