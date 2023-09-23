import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
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
