import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PagoDocentesComponent } from './components/pago-docentes/pago-docentes.component';

import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { IndexComponent } from './components/index/index.component';
import { PersonalComponent } from './components/personal/personal.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { RepresentantesComponent } from './components/representantes/representantes.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagoDocentesComponent,
    IndexComponent,
    PersonalComponent,
    RepresentantesComponent,
    EstudiantesComponent
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
    })
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
