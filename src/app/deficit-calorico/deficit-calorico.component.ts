import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {MainApiService} from "../services/main-api.service";

@Component({
  selector: 'app-deficit-calorico',
  templateUrl: './deficit-calorico.component.html',
  styleUrls: ['./deficit-calorico.component.scss'],
})
export class DeficitCaloricoComponent   {
  public cardClass: any;
  public gridSize: any;
  public history: Observable<any> | undefined;
  constructor(private mainApi: MainApiService) {
    this.verificarTamanhoTela();window.addEventListener('resize', () => {this.verificarTamanhoTela();});
    this.listHistorico();
  }

  verificarTamanhoTela() {
    const width = window.innerWidth;
    if (width >= 768) {
      this.cardClass = 'borderRadius20 rgba pc';
      this.gridSize = "auto"
    } else {
      this.cardClass = 'borderRadius20 rgba ';
      this.gridSize = ""
    }
  }

  public listHistorico(){
    this.history = this.mainApi.getDeficitCaloricoHistorico().pipe(
      map(resp => {if (resp) {return resp.reverse();}return resp;
      })

    );
  }



}
