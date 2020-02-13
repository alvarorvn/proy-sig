import { Component, OnInit } from '@angular/core';
import { OtrosIngresosService } from "../../services/otros-ingresos.service";
import { PagoPersonalService } from "../../services/pago-personal.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-otros-ingresos',
  templateUrl: './otros-ingresos.component.html',
  styleUrls: ['./otros-ingresos.component.css']
})
export class OtrosIngresosComponent implements OnInit {

  ingreso = {
    ingr_id: "",
    ingr_abono: "",
    ingr_descripcion: "",
    mes_id: "",
    anio_id: ""
  }

  p: number = 1;
  allOtrosIngresos: Array<Object> = [];
  meses: Array<Object> = [];
  anios: Array<Object> = [];

  constructor(
    private pagoPersonalService: PagoPersonalService,
    private otroIngresoService: OtrosIngresosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllOtrosIngresos();
    this.getMeses();
    this.getAnios();
    this.ingreso.mes_id = null;
    this.ingreso.anio_id = null;
  }

  save() {
    if (this.ingreso.ingr_id) {
      this.otroIngresoService.updateIngreso(this.ingreso).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllOtrosIngresos();
            this.clearForm(this.ingreso);
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.otroIngresoService.addIngreso(this.ingreso).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllOtrosIngresos();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllOtrosIngresos();
            this.clearForm(this.ingreso);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  editOtroIngreso(otroIngresoEdit) {
    this.ingreso = otroIngresoEdit;
  }

  deleteOtroIngreso(ingr_id) {
    this.otroIngresoService.deleteIngreso(ingr_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllOtrosIngresos();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllOtrosIngresos() {
    this.otroIngresoService.getAllIngresos().subscribe(
      res => {
        if (res.result) {
          this.allOtrosIngresos = res.result;
        } else {
          this.allOtrosIngresos = res;
        }
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

  getAnios() {
    this.pagoPersonalService.getAnios().subscribe(
      res => {
        this.anios = res;
      }
    )
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  clearForm(otro_ingreso) {
    otro_ingreso.ingr_id = null;
    otro_ingreso.ingr_abono = null;
    otro_ingreso.ingr_descripcion = null;
    otro_ingreso.mes_id = null;
    otro_ingreso.anio_id = null;
  }
}
