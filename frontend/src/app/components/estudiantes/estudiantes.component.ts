import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from "../../services/estudiantes.service";
import { RepresentantesService } from "../../services/representantes.service";
import { PersonalService } from "../../services/personal.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  estudiante = {
    est_cedula: "",
    est_nombres: "",
    est_apellidos: "",
    est_fecha_nac: "",
    est_sexo: "",
    ciudad_id: "0",
    rep_cedula: "0"
  }

  sexo: Array<Object> = [
    { sexo_id: 'M', sexo_nombre: 'Masculino' },
    { sexo_id: 'F', sexo_nombre: 'Femenino' }
  ];
  ciudades: Array<Object> = [];
  representantes: Array<Object> = [["0", "Seleccionar..."]];
  allEstudiantes: Array<Object> = [];

  constructor(
    private personalService: PersonalService,
    private repreService: RepresentantesService,
    private estudianteService: EstudiantesService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.getCiudades();
    this.getAllEstudiantes();
    this.getRepresentantes();
    this.estudiante.est_sexo = null;
    this.estudiante.ciudad_id = null;
    this.estudiante.rep_cedula = null;
  }

  save() {
    let input_ced = (<HTMLInputElement>document.getElementById("est_cedula"));
    if (input_ced.disabled) {
      this.estudianteService.updateEstudiante(this.estudiante).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllEstudiantes();
            this.clearForm(this.estudiante);
            (<HTMLInputElement>document.getElementById("est_cedula")).disabled = false;
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.estudianteService.addEstudiante(this.estudiante).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllEstudiantes();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllEstudiantes();
            this.clearForm(this.estudiante);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  editEstudiante(estudianteEdit) {
    this.estudiante = estudianteEdit;
    (<HTMLInputElement>document.getElementById("est_cedula")).disabled = true;
  }

  deleteEstudiante(ced) {
    this.estudianteService.deleteEstudiante(ced).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllEstudiantes();
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

  getRepresentantes() {
    this.repreService.getAllRepresentante().subscribe(
      res => {
        this.representantes = res;
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

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      (<HTMLInputElement>document.getElementById("est_cedula")).disabled = false;
    }
  }

  clearForm(estudiante) {
    estudiante.est_cedula = null;
    estudiante.est_nombres = null;
    estudiante.est_apellidop = null;
    estudiante.est_apellidom = null;
    estudiante.est_fecha_nac = null;
    estudiante.est_sexo = null;
    estudiante.ciudad_id = null;
    estudiante.rep_cedula = null;
  }

}
