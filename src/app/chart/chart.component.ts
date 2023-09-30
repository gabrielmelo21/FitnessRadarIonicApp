import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {MainApiService} from "../services/main-api.service";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  config: any;
  labels: any = ['27/09', '28/09', '29/09', '30/09', '01/10'];
  dates: any = [23, 25, 14, 17, 25];
  constructor(private mainAPI: MainApiService) {

    if (this.labels.length > 7 && this.dates.length > 7 ){
      // retire o primeiro dado para manter a constancia do grafico
    }


  }

  ngOnInit(): void {
    // Este é o lugar onde o gráfico será criado, após o componente ser inicializado.
    this.createLineChart();
  }

  createLineChart() {
    const labels = this.labels;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Deficit Calórico',
        data: this.dates,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.config  = {
      type: 'line',
      data: data,
    };

    new Chart('myChart', this.config);
  }

}
