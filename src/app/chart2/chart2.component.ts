import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js";
import {MainApiService} from "../services/main-api.service";
import {map} from "rxjs";

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss'],
})
export class Chart2Component  implements OnInit {
  config: any;
  labels: Array<any> = [];
  dates: Array<any> = [] ;
  constructor(private mainAPI: MainApiService) {

  }


  public listPesoData() {
    this.mainAPI.getPeso().pipe(
      map((resp: any[]) => {
        this.dates = resp.map(item => Math.abs(item.deficit_calorico));
        this.labels = resp.map(item => item.data_dia);

        this.createLineChart()
      })
    ).subscribe();
  }



  ngOnInit() {
   this.listPesoData();
  }


  createLineChart() {
    const labels = this.labels;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Deficit Calórico',
        data: this.dates,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.config  = {
      type: 'line',
      data: data,
    };

    new Chart('myChart2', this.config);
  }


}
