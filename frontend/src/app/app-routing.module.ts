import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { LoginComponent } from './components/login/login.component';
import { PagoDocentesComponent } from './components/pago-docentes/pago-docentes.component';
import { IndexComponent } from './components/index/index.component';
import { PersonalComponent } from './components/personal/personal.component';
import { RepresentantesComponent } from "./components/representantes/representantes.component";
import { EstudiantesComponent } from "./components/estudiantes/estudiantes.component";

import { AuthGuard, AuthGuard2 } from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
    /*redirectTo: '/login',
    pathMatch: 'full'*/
  },
  {
    path: 'pagodocentes',
    component: PagoDocentesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personal',
    component: PersonalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'representante',
    component: RepresentantesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'estudiante',
    component: EstudiantesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard2]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
