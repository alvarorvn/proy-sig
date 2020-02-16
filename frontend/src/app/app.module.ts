import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { ChartsModule } from "ng2-charts";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { IndexComponent } from './components/index/index.component';
import { PersonalComponent } from './components/personal/personal.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { RepresentantesComponent } from './components/representantes/representantes.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { PagoPersonalComponent } from './components/pago-personal/pago-personal.component';
import { OtrosPagosComponent } from './components/otros-pagos/otros-pagos.component';
import { PensionesComponent } from './components/pensiones/pensiones.component';
import { OtrosIngresosComponent } from './components/otros-ingresos/otros-ingresos.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EstadisticaOneComponent } from './components/estadistica-one/estadistica-one.component';
import { EstadisticaTwoComponent } from './components/estadistica-two/estadistica-two.component';
import { EstadisticaThreeComponent } from './components/estadistica-three/estadistica-three.component';
import { EstadisticaFourComponent } from './components/estadistica-four/estadistica-four.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    PersonalComponent,
    RepresentantesComponent,
    EstudiantesComponent,
    PagoPersonalComponent,
    OtrosPagosComponent,
    PensionesComponent,
    OtrosIngresosComponent,
    MatriculaComponent,
    DashboardComponent,
    EstadisticaOneComponent,
    EstadisticaTwoComponent,
    EstadisticaThreeComponent,
    EstadisticaFourComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    NgSelectModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
