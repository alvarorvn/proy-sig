import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {}

  roles = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  register() {
    this.authService.register(this.user).subscribe(
      res => {
        if (res.tipo == 'error') {
          this.toastr.error(res.message, "Error");
        } else {
          this.toastr.success(res.message, "Exito");
          this.router.navigate(['/login']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  getRoles() {
    this.authService.getRoles().subscribe(
      res => {
        if (res.result) {
          this.roles = res.result;
        } else {
          this.roles = res;
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
