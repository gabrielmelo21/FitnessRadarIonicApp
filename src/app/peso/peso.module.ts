import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PesoComponent} from "./peso.component";
import {IonicModule} from "@ionic/angular";
import {Chart2Module} from "../chart2/chart2.module";



@NgModule({
  declarations: [PesoComponent],
  exports:[PesoComponent],
    imports: [
        CommonModule,
        IonicModule,
        Chart2Module
    ]
})
export class PesoModule { }
