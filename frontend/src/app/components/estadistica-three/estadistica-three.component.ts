import { Component, OnInit } from '@angular/core';
import { PagoPersonalService } from "../../services/pago-personal.service";
import { MatriculaService } from "../../services/matricula.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-estadistica-three',
  templateUrl: './estadistica-three.component.html',
  styleUrls: ['./estadistica-three.component.css']
})
export class EstadisticaThreeComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  periodos: Array<Object> = [];
  anios: Array<Object> = [];
  totalPensiones: Array<Object> = [];
  totalMatriculas: Array<Object> = [];
  totalOtrosIngresos: Array<Object> = [];
  totalPagos: Array<Object> = [];
  totalOtrosPagos: Array<Object> = [];
  totalPensionMes = [];

  fondoColor = [
    'rgba(255, 135, 0, 0.2)',
    'rgba(255, 228, 0, 0.2)',
    'rgba(0, 224, 255, 0.2)',
    'rgba(213, 0, 255, 0.2)'
  ]

  borderColor = [
    'rgba(255, 135, 0, 0.6)',
    'rgba(255, 228, 0, 0.6)',
    'rgba(0, 224, 255, 0.6)',
    'rgba(213, 0, 255, 0.6)'
  ]
  canvas = null;
  ctx = null;


  constructor(
    private pagoPersonalService: PagoPersonalService,
    private matriculaService: MatriculaService
  ) {
  }

  ngOnInit() {
    this.getPeriodos();
    this.getAnios();
    this.getTotalPensiones();
    this.getTotalMatriculas();
    this.getTotalOtrosIngresos();
    this.getTotalOtrosPagos();
    this.getTotalPagos();
    this.canvas = (<HTMLCanvasElement>document.getElementById("canvasGanancias"));
    this.ctx = this.canvas.getContext('2d');
    setTimeout(() => {
      this.initChart()
    }, 1000);
  }

  getPeriodos() {
    this.matriculaService.consulta1().subscribe(
      res => {
        res.forEach(per => {
          this.periodos.push(per['mat_per_lectivo']);
        });
      }
      ,
      err => { })
  }

  getAnios() {
    this.pagoPersonalService.getAnios().subscribe(
      res => {
        this.anios = res;
      }
      ,
      err => { })
  }

  getTotalPensiones() {
    this.matriculaService.getTotalPensiones().subscribe(
      res => {
        this.totalPensiones = res;
      }
      ,
      err => { })
  }

  getTotalMatriculas() {
    this.matriculaService.getTotalMatriculas().subscribe(
      res => {
        this.totalMatriculas = res;
      }
      ,
      err => { })
  }

  getTotalOtrosIngresos() {
    this.matriculaService.getTotalOtrosIngresos().subscribe(
      res => {
        this.totalOtrosIngresos = res;
      }
      ,
      err => { })
  }

  getTotalOtrosPagos() {
    this.matriculaService.getTotalOtrosPagos().subscribe(
      res => {
        this.totalOtrosPagos = res;
      }
      ,
      err => { })
  }

  getTotalPagos() {
    this.matriculaService.getTotalPagos().subscribe(
      res => {
        this.totalPagos = res;
      }
      ,
      err => { })
  }

  initChart() {
    let data = {};
    let dataSet = [];
    let labels = [];

    var cont = 0;

    this.anios.forEach(anio => {
      let totalGananciasXanio = [];
      //let ganancias = 0
      let totIngresosXanio = 0;
      let totEgresosXanio = 0;
      let objDataSet = {};
      objDataSet['label'] = anio['anio_numero'];
      labels.push(anio['anio_numero']);

      this.totalMatriculas.forEach(matricula => {
        if (matricula['mat_per_lectivo'].split("-")[0].toString().includes(anio['anio_numero'].toString())) {
          totIngresosXanio = totIngresosXanio + matricula['total_matriculas']
        }
      });

      this.totalPensiones.forEach(pension => {
        if (pension['anio_id'] === anio['anio_id']) {
          totIngresosXanio = totIngresosXanio + pension['total_pensiones']
        }
      });

      this.totalOtrosIngresos.forEach(otingr => {
        if (otingr['anio_id'] === anio['anio_id']) {
          totIngresosXanio = totIngresosXanio + otingr['total_otros_ingresos']
        }
      });

      this.totalPagos.forEach(pago => {
        if (pago['anio_id'] === anio['anio_id']) {
          totEgresosXanio = totEgresosXanio + pago['total_pagos']
        }
      });

      this.totalOtrosPagos.forEach(opago => {
        if (opago['anio_id'] === anio['anio_id']) {
          totEgresosXanio = totEgresosXanio + opago['total_otros_pagos']
        }
      });

      this.anios.forEach(an => {

        let ganancias = 0;

        if (anio['anio_numero'] === an['anio_numero']) {
          ganancias = totIngresosXanio - totEgresosXanio;
        }

        totalGananciasXanio.push(ganancias);

      });
      
      objDataSet['data'] = totalGananciasXanio;
      objDataSet['backgroundColor'] = this.fondoColor[cont];
      objDataSet['borderColor'] = this.borderColor[cont];
      cont++;

      dataSet.push(objDataSet);
    });

    data['labels'] = labels;
    data['datasets'] = dataSet;

    new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: this.chartOptions
    });
  }

}
