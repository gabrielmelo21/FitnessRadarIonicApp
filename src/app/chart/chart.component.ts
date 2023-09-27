import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
 config: any;
  constructor() { }

  ngOnInit(): void {
    // Este é o lugar onde o gráfico será criado, após o componente ser inicializado.
    this.createLineChart();
  }

  createLineChart() {
    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Vendas',
        data: [100, 200, 300, 400, 500, 600, 700],
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
