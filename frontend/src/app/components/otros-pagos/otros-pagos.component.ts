import { Component, OnInit } from '@angular/core';
import { OtrosPagosService } from "../../services/otros-pagos.service";
import { PagoPersonalService } from "../../services/pago-personal.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-otros-pagos',
  templateUrl: './otros-pagos.component.html',
  styleUrls: ['./otros-pagos.component.css']
})
export class OtrosPagosComponent implements OnInit {

  otro_pago = {
    pgotro_id: "",
    pgotro_abono: "",
    pgotro_descripcion: "",
    mes_id: "",
    anio_id: ""
  }

  p: number = 1;
  allOtrosPagos: Array<Object> = [];
  meses: Array<Object> = [];
  anios: Array<Object> = [];


  constructor(
    private pagoPersonalService: PagoPersonalService,
    private otroPagoService: OtrosPagosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllOtrosPagos();
    this.getMeses();
    this.getAnios();
    this.otro_pago.mes_id = null;
    this.otro_pago.anio_id = null;
  }

  save() {
    if (this.otro_pago.pgotro_id) {
      this.otroPagoService.updateOtroPago(this.otro_pago).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllOtrosPagos();
            this.clearForm(this.otro_pago);
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.otroPagoService.addOtroPago(this.otro_pago).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllOtrosPagos();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllOtrosPagos();
            this.clearForm(this.otro_pago);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  editOtroPago(otroPagoEdit) {
    this.otro_pago = otroPagoEdit;
  }

  deleteOtroPago(pgdoc_id) {
    this.otroPagoService.deleteOtroPago(pgdoc_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllOtrosPagos();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllOtrosPagos() {
    this.otroPagoService.getAllOtrosPagos().subscribe(
      res => {
        if (res.result) {
          this.allOtrosPagos = res.result;
        } else {
          this.allOtrosPagos = res;
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

  clearForm(otro_pago) {
    otro_pago.pgotro_id = null;
    otro_pago.pgotro_abono = null;
    otro_pago.pgotro_descripcion = null;
    otro_pago.mes_id = null;
    otro_pago.anio_id = null;
  }
}
