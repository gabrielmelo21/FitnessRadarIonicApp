import { Component} from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  chart: any;

 constructor() {

   const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'];
   const data = [100, 200, 300, 400, 500];

   this.chart = new Chart('myChart', {
     type: 'line', // Alterado para 'line' para um gráfico de linha
     data: {
       labels: labels,
       datasets: [{
         label: 'Vendas',
         data: data,
         borderColor: 'rgba(0, 128, 255, 0.6)', // Cor da linha
         backgroundColor: 'rgba(0, 128, 255, 0.2)' // Cor do preenchimento da área abaixo da linha
       }]
     },

     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   });

 } //comts




}
