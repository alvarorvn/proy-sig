import { Component, OnInit } from '@angular/core';
import { PersonalService } from "../../services/personal.service";
import { PagoPersonalService } from "../../services/pago-personal.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-pago-personal',
  templateUrl: './pago-personal.component.html',
  styleUrls: ['./pago-personal.component.css']
})
export class PagoPersonalComponent implements OnInit {

  pago_pers = {
    pgdoc_id: "",
    pgdoc_abono: "",
    pgdoc_deuda: "",
    mes_id: "",
    anio_id: "",
    pers_cedula: "",
  }

  p: number = 1;
  persSelected = {};
  tipo = "";
  allPagosPersonal: Array<Object> = [];
  allPersonal: Array<Object> = [];
  meses: Array<Object> = [];
  anios: Array<Object> = [];

  constructor(
    private personalService: PersonalService,
    private pagoPersonalService: PagoPersonalService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getAllPagoPersonal();
    this.getAllPersonal();
    this.getMeses();
    this.getaAnios();
    this.pago_pers.anio_id = null;
    this.pago_pers.mes_id = null;
    this.pago_pers.pers_cedula = null;
  }

  save() {
    if (this.pago_pers.pgdoc_id) {
      this.pago_pers.pers_cedula = this.persSelected['pers_cedula'];
      this.pagoPersonalService.updatePagoPersonal(this.pago_pers).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllPagoPersonal();
            this.clearForm(this.pago_pers);
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.pago_pers.pers_cedula = this.persSelected['pers_cedula'];
      this.pagoPersonalService.save(this.pago_pers).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllPagoPersonal();
            this.clearForm(this.pago_pers);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  editPagoPersonal(pagoPersonalEdit) {
    this.persSelected = `${pagoPersonalEdit['pers_nombres']} ${pagoPersonalEdit['pers_apellidop']} ${pagoPersonalEdit['pers_apellidom']}`;
    this.tipo = pagoPersonalEdit['pers_tipo'];
    this.pago_pers = pagoPersonalEdit;
  }

  deletePagoPersonal(pgdoc_id) {
    this.pagoPersonalService.deletePagoPersonal(pgdoc_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllPagoPersonal();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllPagoPersonal() {
    this.pagoPersonalService.getAllPagosPersonal().subscribe(
      res => {
        if (res.result) {
          this.allPagosPersonal = res.result;
        } else {
          this.allPagosPersonal = res;
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

  getaAnios() {
    this.pagoPersonalService.getAnios().subscribe(
      res => {
        this.anios = res;
      }
    )
  }

  getAllPersonal() {
    this.personalService.getAllPersonal().subscribe(
      res => {
        if (res.result) {
          this.allPersonal = res.result;
        } else {
          this.allPersonal = res;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  clearForm(pago_pers) {
    this.persSelected = null;
    pago_pers.pgdoc_id = null;
    pago_pers.pgdoc_abono = null;
    pago_pers.pgdoc_deuda = null;
    pago_pers.mes_id = null;
    pago_pers.anio_id = null;
    pago_pers.pers_cedula = null;
    this.tipo = '';
  }

  setTipo() {
    this.tipo = this.persSelected['pers_tipo'];
  }
}
