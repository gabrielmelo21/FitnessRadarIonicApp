import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeficitCaloricoComponent} from "./deficit-calorico.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [DeficitCaloricoComponent],
  exports: [DeficitCaloricoComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class DeficitCaloricoModule { }
