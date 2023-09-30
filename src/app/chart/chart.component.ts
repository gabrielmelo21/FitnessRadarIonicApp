import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {MainApiService} from "../services/main-api.service";
import {map} from "rxjs";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  config: any;
  mainArray: Array<any> = [] ;
  labels: Array<any> = [] ;
  dates: Array<any> = [] ;
  constructor(private mainAPI: MainApiService) {




  }

  public listHistorico() {
    this.mainAPI.getDeficitCaloricoHistorico().pipe(
      map((resp: any[]) => {
        // Mapear os dados de 'deficit_calorico' para o array 'dates'
        this.dates = resp.map(item => Math.abs(item.deficit_calorico));


        // Mapear os dados de 'data_dia' para o array 'labels'
        this.labels = resp.map(item => item.data_dia);

        if (this.labels.length > 7) {
          // Reduzir o tamanho do array para 7 elementos, mantendo os últimos 7 elementos
          this.labels = this.labels.slice(-7);
          this.dates = this.dates.slice(-7);
        }
        this.createLineChart();

      })
    ).subscribe();
  }



  ngOnInit(): void {

    this.listHistorico()

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

    new Chart('myChart', this.config);
  }

}
