import { Component, OnInit } from '@angular/core';
import { PagoPersonalService } from "../../services/pago-personal.service";
import { PensionesService } from "../../services/pensiones.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-estadistica-one',
  templateUrl: './estadistica-one.component.html',
  styleUrls: ['./estadistica-one.component.css']
})
export class EstadisticaOneComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  chartLabelMes = [];

  anios: Array<Object> = [];
  allPensiones: Array<Object> = [];
  anio_selected = null;
  totalPensionMes = [];
  fondoColor = [
    'rgba(213, 54, 54, 0.2)',
    'rgba(26, 138, 220, 0.2)',
    'rgba(13, 161, 40, 0.2)',
    'rgba(11, 58, 232, 0.2)'
  ]
  bordeColor = [
    'rgba(213, 54, 54, 0.5)',
    'rgba(26, 138, 220, 0.5)',
    'rgba(13, 161, 40, 0.5)',
    'rgba(11, 58, 232, 0.5)'
  ]
  canvasPens = null;
  ctx = null;


  constructor(
    private pagoPersonalService: PagoPersonalService,
    private pensionService: PensionesService
  ) {
  }

  ngOnInit() {
    this.getMeses();
    this.getaAnios();
    this.canvasPens = (<HTMLCanvasElement>document.getElementById("canvasPens"));
    this.ctx = this.canvasPens.getContext('2d');
    this.getAllPensiones();
    this.anio_selected = 1;
    setTimeout(() => {
      this.initChart()
    }, 1000);
  }

  getMeses() {
    this.pagoPersonalService.getMeses().subscribe(
      res => {
        res.forEach(mes => {
          this.chartLabelMes.push(mes.mes_nombre);
        });
      }
      ,
      err => { })
  }

  getaAnios() {
    this.pagoPersonalService.getAnios().subscribe(
      res => {
        this.anios = res;
      }
    )
  }

  getAllPensiones() {
    this.pensionService.getAllPensiones().subscribe(
      res => {
        this.allPensiones = res;
      }
      ,
      err => { })
  }


  initChart() {
    let data = {};
    let dataSet = [];
    data['labels'] = this.chartLabelMes;

    var cont = 0;

    this.anios.forEach(year => {
      let pensTotalMes = [];
      let objDataSet = {};
      objDataSet['label'] = year['anio_numero'];
      this.chartLabelMes.forEach(mes => {
        let totMes = 0;
        this.allPensiones.forEach(pension => {
          if (pension['anio_numero'] == year['anio_numero'] && pension['mes_nombre'] == mes) {
            totMes = totMes + pension['pens_abono'];
          }
        });
        pensTotalMes.push(totMes);
        objDataSet['data'] = pensTotalMes;
      });

      objDataSet['backgroundColor'] = this.fondoColor[cont];
      objDataSet['borderColor'] = this.bordeColor[cont];
      cont++;

      dataSet.push(objDataSet);
    });

    data['datasets'] = dataSet;

    new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: this.chartOptions
    });
  }

}
