import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeficitCaloricoComponent} from "./deficit-calorico.component";
import {IonicModule} from "@ionic/angular";
import {ChartModule} from "../chart/chart.module";



@NgModule({
  declarations: [DeficitCaloricoComponent],
  exports: [DeficitCaloricoComponent],
    imports: [
        CommonModule,
        IonicModule,
        ChartModule
    ]
})
export class DeficitCaloricoModule { }
