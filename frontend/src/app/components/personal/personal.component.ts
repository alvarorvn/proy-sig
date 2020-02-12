import { Component, OnInit } from '@angular/core';
import { PersonalService } from "../../services/personal.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  personal = {
    pers_cedula: "",
    pers_nombres: "",
    pers_apellidop: "",
    pers_apellidom: "",
    pers_email: "",
    pers_fecha_nac: "",
    pers_telf: "",
    pers_sexo: "",
    pers_tipo: "",
    ciudad_id: "0"
  }

  p: number = 1;
  sexo: Array<Object> = [
    { sexo_id: 'MASCULINO', sexo_nombre: 'Masculino' },
    { sexo_id: 'FEMENINO', sexo_nombre: 'Femenino' }
  ];
  tipos: Array<Object> = [
    { tipo_id: 'PERSONAL', tipo_nombre: 'Personal' },
    { tipo_id: 'DOCENTE', tipo_nombre: 'Docente' }
  ];
  ciudades: Array<Object> = [];
  allPersonal: Array<Object> = [];

  constructor(
    private personalService: PersonalService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getCiudades();
    this.getAllPersonal();
    this.personal['pers_sexo'] = null;
    this.personal['ciudad_id'] = null;
    this.personal['pers_tipo'] = null;
  }

  save() {
    let input_ced = (<HTMLInputElement>document.getElementById("pers_cedula"));
    if (input_ced.disabled) {
      this.personalService.updatePersonal(this.personal).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllPersonal();
            this.clearForm(this.personal);
            (<HTMLInputElement>document.getElementById("pers_cedula")).disabled = false;
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.personalService.register(this.personal).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllPersonal();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllPersonal();
            this.clearForm(this.personal);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
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
      (<HTMLInputElement>document.getElementById("pers_cedula")).disabled = false;
    }
  }

  clearForm(personal) {
    personal.pers_cedula = null;
    personal.pers_nombres = null;
    personal.pers_apellidop = null;
    personal.pers_apellidom = null;
    personal.pers_email = null;
    personal.pers_fecha_nac = null;
    personal.pers_telf = null;
    personal.pers_sexo = null;
    personal.pers_tipo = null;
    personal.ciudad_id = null;
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

  editPersonal(personalEdit) {
    this.personal = personalEdit;
    (<HTMLInputElement>document.getElementById("pers_cedula")).disabled = true;
  }

  deletePersonal(ced) {
    this.personalService.deletePersonal(ced).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllPersonal();
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
