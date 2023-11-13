import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartComponent} from "./chart.component";
import {NgChartsModule} from "ng2-charts";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
    imports: [
        CommonModule,
        NgChartsModule,
        IonicModule
    ]
})
export class ChartModule { }
