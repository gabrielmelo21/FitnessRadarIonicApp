import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deficit-calorico',
  templateUrl: './deficit-calorico.component.html',
  styleUrls: ['./deficit-calorico.component.scss'],
})
export class DeficitCaloricoComponent   {
  public cardClass: any;
  public gridSize: any;
  constructor() {
    this.verificarTamanhoTela();window.addEventListener('resize', () => {this.verificarTamanhoTela();});
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

}
