import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Chart2Component} from "./chart2.component";



@NgModule({
  declarations: [Chart2Component],
  exports: [Chart2Component],
  imports: [
    CommonModule
  ]
})
export class Chart2Module { }
