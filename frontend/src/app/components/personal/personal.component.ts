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
    pers_apellidos: "",
    pers_email: "",
    pers_fecha_nac: "",
    pers_telf: "",
    pers_sexo: "",
    pers_tipo: "",
    ciudad_id: "0"
  }

  sexo: string[] = ["Masculino", "Femenino"];
  tipos: string[] = ["Personal", "Docente"];
  ciudades: Array<Object> = [["0", "Seleccionar..."]];
  allPersonal: Array<Object> = [];

  constructor(
    private personalService: PersonalService,
    private toastr: ToastrService
  ) {
    this.personal['pers_sexo'] = this.sexo[0];
    this.personal['pers_tipo'] = this.tipos[0];
  }

  ngOnInit() {
    this.getCiudades();
    this.getAllPersonal();
  }

  save() {
    let input_ced = (<HTMLInputElement>document.getElementById("pers_cedula"));
    if (input_ced.disabled) {
      console.log('dis');
    } else {
      this.personalService.register(this.personal).subscribe(
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

  getAllPersonal() {
    this.personalService.getAllPersonal().subscribe(
      res => {
        this.allPersonal = res;
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

  getCiudades() {
    this.personalService.getCiudades().subscribe(
      res => {
        res.forEach(ciudad => {
          this.ciudades.push(ciudad);
        });
        this.personal['ciudad_id'] = this.ciudades[0][0];
      },
      err => {
        console.log(err);
      }
    )
  }

  editPersonal(personalEdit) {
    this.personal.pers_cedula = personalEdit[0];
    this.personal.pers_nombres = personalEdit[1];
    this.personal.pers_apellidos = personalEdit[2];
    this.personal.pers_email = personalEdit[3];
    this.personal.pers_fecha_nac = personalEdit[4];
    this.personal.pers_telf = personalEdit[5];
    this.personal.pers_sexo = personalEdit[6];
    this.personal.pers_tipo = personalEdit[7];
    this.personal.ciudad_id = personalEdit[9];
    (<HTMLInputElement>document.getElementById("pers_cedula")).disabled = true;
  }
}
