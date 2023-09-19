import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  changeSlot: any;
  constructor( ) {
    this.verificarTamanhoTela();

    window.addEventListener('resize', () => {
      this.verificarTamanhoTela();
    });
  }

  verificarTamanhoTela() {
    const width = window.innerWidth;
      if (width >= 768) {
        this.changeSlot = 'top';
      } else {
        this.changeSlot = 'bottom';
      }
  }



}
