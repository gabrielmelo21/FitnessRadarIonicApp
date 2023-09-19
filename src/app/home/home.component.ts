import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent   {
  public alimentosIngeridos: Array<{nome: string, calorias: number, quantidade: number}> = [];
  public cardClass: any;
  public gridSize: any;
  constructor( ) {
    this.verificarTamanhoTela();

    window.addEventListener('resize', () => {
      this.verificarTamanhoTela();
    });
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
