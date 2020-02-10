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
    rep_apellidos: "",
    rep_email: "",
    rep_telf: "",
    ciudad_id: "0"
  }

  tipos: string[] = ["Personal", "Docente"];
  ciudades: Array<Object> = [["0", "Seleccionar..."]];
  allRepre: Array<Object> = [];

  constructor(
    private repreService: RepresentantesService,
    private personalService: PersonalService,
    private toastr: ToastrService
  ) {
    this.repre['rep_tipo'] = this.tipos[0];
  }

  ngOnInit() {
    this.getCiudades();
    this.getAllRepresentantes();
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
        res.forEach(ciudad => {
          this.ciudades.push(ciudad);
        });
        this.repre['ciudad_id'] = this.ciudades[0][0];
      },
      err => {
        console.log(err);
      }
    )
  }

  editRepre(repreEdit) {
    this.repre.rep_cedula = repreEdit[0];
    this.repre.rep_nombres = repreEdit[1];
    this.repre.rep_apellidos = repreEdit[2];
    this.repre.rep_email = repreEdit[3];
    this.repre.rep_telf = repreEdit[4];
    this.repre.ciudad_id = repreEdit[6];
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
    repre.rep_cedula = "";
    repre.rep_nombres = "";
    repre.rep_apellidos = "";
    repre.rep_email = "";
    repre.rep_telf = "";
    repre.ciudad_id = "0";
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      (<HTMLInputElement>document.getElementById("rep_cedula")).disabled = false;
    }
  }
}
