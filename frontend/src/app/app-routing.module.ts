import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IndexComponent } from './components/index/index.component';
import { PersonalComponent } from './components/personal/personal.component';
import { RepresentantesComponent } from "./components/representantes/representantes.component";
import { EstudiantesComponent } from "./components/estudiantes/estudiantes.component";
import { PagoPersonalComponent } from "./components/pago-personal/pago-personal.component";
import { OtrosPagosComponent } from "./components/otros-pagos/otros-pagos.component";
import { PensionesComponent } from "./components/pensiones/pensiones.component";
import { OtrosIngresosComponent } from "./components/otros-ingresos/otros-ingresos.component";
import { MatriculaComponent } from "./components/matricula/matricula.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

import { AuthGuard, AuthGuard2 } from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent/*,
    redirectTo: '/login',
    pathMatch: 'full'*/
  },
  {
    path: 'pagos',
    component: PagoPersonalComponent,
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
    path: 'opagos',
    component: OtrosPagosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pensiones',
    component: PensionesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'oingresos',
    component: OtrosIngresosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'matriculas',
    component: MatriculaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'estadistica',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard2]
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
