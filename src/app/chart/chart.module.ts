import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartComponent} from "./chart.component";
import {NgChartsModule} from "ng2-charts";



@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [
    CommonModule,
    NgChartsModule
  ]
})
export class ChartModule { }
