import { Component, OnInit } from '@angular/core';
import { RepresentantesService } from "../../services/representantes.service";
import { PersonalService } from "../../services/personal.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.css']
})
export class RepresentantesComponent implements OnInit {

  repre = {
    rep_cedula: "",
    rep_nombres: "",
    rep_apellidop: "",
    rep_apellidom: "",
    rep_email: "",
    rep_telf: "",
    ciudad_id: ""
  }

  ciudades: Array<Object> = [];
  allRepre: Array<Object> = [];

  constructor(
    private repreService: RepresentantesService,
    private personalService: PersonalService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getCiudades();
    this.getAllRepresentantes();
    this.repre['ciudad_id'] = null;
  }

  save() {
    let input_ced = (<HTMLInputElement>document.getElementById("rep_cedula"));
    if (input_ced.disabled) {
      this.repreService.updateRepresentante(this.repre).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllRepresentantes();
            this.clearForm(this.repre);
            (<HTMLInputElement>document.getElementById("rep_cedula")).disabled = false;
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.repreService.addRepresentante(this.repre).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllRepresentantes();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllRepresentantes();
            this.clearForm(this.repre);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  getAllRepresentantes() {
    this.repreService.getAllRepresentante().subscribe(
      res => {
        this.allRepre = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getCiudades() {
    this.personalService.getCiudades().subscribe(
      res => {
        this.ciudades = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  editRepre(repreEdit) {
    this.repre = repreEdit;
    (<HTMLInputElement>document.getElementById("rep_cedula")).disabled = true;
  }

  deleteRepre(ced) {
    this.repreService.deleteRepresentante(ced).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllRepresentantes();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  clearForm(repre) {
    repre.rep_cedula = null;
    repre.rep_nombres = null;
    repre.rep_apellidop = null;
    repre.rep_apellidom = null;
    repre.rep_email = null;
    repre.rep_telf = null;
    repre.ciudad_id = null;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      (<HTMLInputElement>document.getElementById("rep_cedula")).disabled = false;
    }
  }
}
