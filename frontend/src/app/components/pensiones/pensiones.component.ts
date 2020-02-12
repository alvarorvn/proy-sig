import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from "../../services/estudiantes.service";
import { PagoPersonalService } from "../../services/pago-personal.service";
import { PensionesService } from "../../services/pensiones.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pensiones',
  templateUrl: './pensiones.component.html',
  styleUrls: ['./pensiones.component.css']
})
export class PensionesComponent implements OnInit {

  pension = {
    pens_id: "",
    pens_abono: "",
    pens_deuda: "",
    mes_id: "",
    anio_id: "",
    est_cedula: "",
  }

  allPensiones: Array<Object> = [];
  allEstudiantesNames: Array<Object> = [];
  meses: Array<Object> = [];
  anios: Array<Object> = [];

  constructor(
    private estudianteService: EstudiantesService,
    private pagoPersonalService: PagoPersonalService,
    private pensionesService: PensionesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllPensiones();
    this.getAllEstudiantesNames();
    this.getMeses();
    this.getaAnios();
    this.pension.anio_id = null;
    this.pension.mes_id = null;
    this.pension.est_cedula = null;
  }

  getAllPensiones() {
    this.pensionesService.getAllPensiones().subscribe(
      res => {
        if (res.result) {
          this.allPensiones = res.result;
        } else {
          this.allPensiones = res;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllEstudiantesNames() {
    /*this.estudianteService.getAllPersonalNames().subscribe(
      res => {
        //this.allPersonalNames = res;
      }
    )*/
  }

  getMeses() {
    this.pagoPersonalService.getMeses().subscribe(
      res => {
        this.meses = res;
      }
    )
  }

  getaAnios() {
    this.pagoPersonalService.getAnios().subscribe(
      res => {
        this.anios = res;
      }
    )
  }

}
