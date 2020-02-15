import { Component, OnInit } from '@angular/core';
import { PagoPersonalService } from "../../services/pago-personal.service";
import { MatriculaService } from "../../services/matricula.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-estadistica-four',
  templateUrl: './estadistica-four.component.html',
  styleUrls: ['./estadistica-four.component.css']
})
export class EstadisticaFourComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  periodos: Array<Object> = [];
  consulta1: Array<Object> = [];
  totalPensionMes = [];
  
  fondoColor = [
    'rgba(92, 113, 194, 0.6)',
    'rgba(165, 92, 194, 0.6)',
    'rgba(194, 92, 93, 0.6)',
    'rgba(92, 194, 155, 0.6)'
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
    //this.periodos = ['2016-2017', '2017-2018', '2018-2019', '2019-2020'];
    this.canvas = (<HTMLCanvasElement>document.getElementById("canvasCantEst"));
    this.ctx = this.canvas.getContext('2d');
    this.getCantPorcEst();
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

  getCantPorcEst() {
    this.matriculaService.consulta1().subscribe(
      res => {
        this.consulta1 = res;
      }
      ,
      err => { })
  }


  initChart() {
    let data = {};
    let dataSet = [];
    data['labels'] = ['Cantidad de estudiantes'];

    var cont = 0;

    this.periodos.forEach(periodo => {
      let pensTotalMes = [];
      let objDataSet = {};
      objDataSet['label'] = periodo;

      this.consulta1.forEach(consulta => {
        //let totAnio = 0;
        if(periodo == consulta['mat_per_lectivo']){
          //totAnio = consulta['cant_est'];
          pensTotalMes.push(consulta['cant_est']);
        }
      });
      
      objDataSet['data'] = pensTotalMes;
      objDataSet['backgroundColor'] = this.fondoColor[cont];
      cont++;

      dataSet.push(objDataSet);
    });

    data['datasets'] = dataSet;

    console.log(data);

    new Chart(this.ctx, {
      type: 'horizontalBar',
      data: data,
      options: this.chartOptions
    });
  }

}
