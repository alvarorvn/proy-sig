import { Component, OnInit } from '@angular/core';
import { PagoPersonalService } from "../../services/pago-personal.service";
import { PensionesService } from "../../services/pensiones.service";
import { Chart } from "chart.js";

@Component({
  selector: 'app-estadistica-two',
  templateUrl: './estadistica-two.component.html',
  styleUrls: ['./estadistica-two.component.css']
})
export class EstadisticaTwoComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  chartLabelMesPorcEst = [];

  aniosPorcEst: Array<Object> = [];
  allPensionesPorcEst: Array<Object> = [];
  totalPensionMes = [];
  fondoColor = [
    'rgba(92, 113, 194, 0.6)',
    'rgba(165, 92, 194, 0.6)',
    'rgba(194, 92, 93, 0.6)',
    'rgba(92, 194, 155, 0.6)'
  ]
  canvasPorcEst = null;
  ctxPorcEst = null;


  constructor(
    private pagoPersonalService: PagoPersonalService,
    private pensionService: PensionesService
  ) {
  }

  ngOnInit() {
    this.getMesesPorcEst();
    this.getaAniosPorcEst();
    this.canvasPorcEst = (<HTMLCanvasElement>document.getElementById("canvasPorcEst"));
    this.ctxPorcEst = this.canvasPorcEst.getContext('2d');
    this.getAllPensionePorcEst();
    setTimeout(() => {
      this.initChartPorcEst()
    }, 1000);
  }

  getMesesPorcEst() {
    this.pagoPersonalService.getMeses().subscribe(
      res => {
        res.forEach(mes => {
          this.chartLabelMesPorcEst.push(mes.mes_nombre);
        });
      }
      ,
      err => { })
  }

  getaAniosPorcEst() {
    this.pagoPersonalService.getAnios().subscribe(
      res => {
        this.aniosPorcEst = res;
      }
    )
  }

  getAllPensionePorcEst() {
    this.pensionService.getTodasPensiones().subscribe(
      res => {
        this.allPensionesPorcEst = res;
        console.log(res);
      }
      ,
      err => { })
  }


  initChartPorcEst() {
    let data = {};
    let dataSet = [];
    data['labels'] = this.chartLabelMesPorcEst;

    var cont = 0;

    this.aniosPorcEst.forEach(year => {
      let totAnio = 0;
      let totalporcXmes = [];
      let objDataSet = {};
      objDataSet['label'] = year['anio_numero'];

      this.allPensionesPorcEst.forEach(pension => {
        if (pension['anio'] == year['anio_numero']) {
          totAnio = totAnio + pension['total_deuda'];
        }
      });

      console.log(`anio ${year['anio_numero']} ${totAnio}`);

      this.chartLabelMesPorcEst.forEach(mes => {
        let porcXmes = 0;
        this.allPensionesPorcEst.forEach(pension => {
          if (pension['anio'] == year['anio_numero'] && pension['mes'] == mes) {
            
          porcXmes = parseFloat((pension['total_deuda']*(100/totAnio)).toFixed(2));
          }
        });

        if(isNaN(porcXmes)) porcXmes = 0.00;        
        totalporcXmes.push(porcXmes);
        objDataSet['data'] = totalporcXmes;
      });
      console.log(totalporcXmes);

      objDataSet['backgroundColor'] = this.fondoColor[cont];
      cont++;

      dataSet.push(objDataSet);
    });

    data['datasets'] = dataSet;
    console.log(data);

    new Chart(this.ctxPorcEst, {
      type: 'bar',
      data: data,
      options: this.chartOptions
    });
  }

}
