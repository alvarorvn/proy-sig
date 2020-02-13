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

  p: number = 1;
  allPensiones: Array<Object> = [];
  allEstudiantes: Array<Object> = [];
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
    this.getAllEstudiantes();
    this.getMeses();
    this.getaAnios();
    this.pension.anio_id = null;
    this.pension.mes_id = null;
    this.pension.est_cedula = null;
  }

  save() {
    if (this.pension.pens_id) {
      this.pensionesService.updatePension(this.pension).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllPensiones();
            this.clearForm(this.pension);
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.pensionesService.save(this.pension).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllPensiones();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllPensiones();
            this.clearForm(this.pension);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
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

  editPension(pensionEdit) {
    this.pension = pensionEdit;
  }

  deletePension(pens_id) {
    this.pensionesService.deletePension(pens_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllPensiones();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllEstudiantes() {
    this.estudianteService.getAllEstudiante().subscribe(
      res => {
        this.allEstudiantes = res;
      },
      err => {
        console.log(err);
      }
    )
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

  clearForm(pension) {
    pension.pens_id = null;
    pension.pens_abono = null;
    pension.pens_deuda = null;
    pension.mes_id = null;
    pension.anio_id = null;
    pension.est_cedula = null;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
