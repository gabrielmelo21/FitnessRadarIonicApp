import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /**

  animationFadeIn: string = "animate__animated animate__fadeInLeft";
  animationFadeOut: string  = "animate__animated animate__fadeOutLeft";

  constructor(private router: Router) {}

  public changePage(path: string){
    this.animationStatus = false; //executa animação de out
    setTimeout(() => {
      this.animationStatus = true; //set para true novamente
      this.router.navigate([path]);
    }, 300)
  }
**/
}
