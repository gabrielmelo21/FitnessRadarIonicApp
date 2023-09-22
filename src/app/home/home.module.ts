import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class HomeModule { }
