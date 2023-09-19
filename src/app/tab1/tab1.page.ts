import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public toolbar: any;
  constructor( ) {
    this.verificarTamanhoTela();

    window.addEventListener('resize', () => {
      this.verificarTamanhoTela();
    });
  }

  verificarTamanhoTela() {
    const width = window.innerWidth;
    if (width >= 768) {
      this.toolbar = false;
    } else {

      this.toolbar = true;
    }
  }

}
