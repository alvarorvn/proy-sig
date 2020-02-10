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

  sexo: string[] = ["Masculino", "Femenino"];
  ciudades: Array<Object> = [["0", "Seleccionar..."]];
  representantes: Array<Object> = [["0", "Seleccionar..."]];
  allEstudiantes: Array<Object> = [];

  constructor(
    private personalService: PersonalService,
    private repreService: RepresentantesService,
    private estudianteService: EstudiantesService,
    private toastr: ToastrService
  ) {
    this.estudiante['est_sexo'] = this.sexo[0];
  }

  ngOnInit() {
    this.getCiudades();
    this.getAllEstudiantes();
    this.getRepresentantes();
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
    this.estudiante.est_cedula = estudianteEdit[0];
    this.estudiante.est_nombres = estudianteEdit[1];
    this.estudiante.est_apellidos = estudianteEdit[2];
    this.estudiante.est_fecha_nac = estudianteEdit[3];
    this.estudiante.est_sexo = estudianteEdit[4];
    this.estudiante.ciudad_id = estudianteEdit[6];
    this.estudiante.rep_cedula = estudianteEdit[9];
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
        res.forEach(representante => {
          this.representantes.push(representante);
        });
        this.estudiante.rep_cedula = this.representantes[0][0];
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
        this.estudiante['ciudad_id'] = this.ciudades[0][0];
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
    estudiante.est_cedula = "";
    estudiante.est_nombres = "";
    estudiante.est_apellidos = "";
    estudiante.est_fecha_nac = "";
    estudiante.est_sexo = this.sexo[0];
    estudiante.ciudad_id = "0";
    estudiante.rep_cedula = "0";
  }

}
