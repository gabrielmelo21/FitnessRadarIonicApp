import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PesoComponent} from "./peso.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [PesoComponent],
  exports:[PesoComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class PesoModule { }
