import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from "../../services/estudiantes.service";
import { MatriculaService } from "../../services/matricula.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  matricula = {
    matr_id: "",
    mat_monto: "",
    mat_per_lectivo: ""
  }

  p: number = 1;
  allMatriculas: Array<Object> = [];
  allEstudiantes: Array<Object> = [];

  constructor(
    private estudianteService: EstudiantesService,
    private matriculaService: MatriculaService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllMatriculas();
    this.getAllEstudiantes();
  }

  save() {
    if (this.matricula.matr_id) {
      this.matriculaService.updateMatricula(this.matricula).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllMatriculas();
            this.clearForm(this.matricula);
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.matriculaService.addMatricula(this.matricula).subscribe(
        res => {
          if (res.tipo == 'error') {
            this.toastr.error(res.message, "Error");
            this.getAllMatriculas();
          } else {
            this.toastr.success(res.message, "Éxito");
            this.getAllMatriculas();
            this.clearForm(this.matricula);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  getAllMatriculas() {
    this.matriculaService.getAllMatriculas().subscribe(
      res => {
        if (res.result) {
          this.allMatriculas = res.result;
        } else {
          this.allMatriculas = res;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  editMatricula(matriculaEdit) {
    this.matricula = matriculaEdit;
  }

  deleteMatricula(matr_id) {
    this.matriculaService.deleteMatricula(matr_id).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Éxito");
          this.getAllMatriculas();
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

  clearForm(matricula) {
    matricula.matr_id = null;
    matricula.mat_monto = null;
    matricula.mat_per_lectivo = null;
    matricula.est_cedula = null;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
