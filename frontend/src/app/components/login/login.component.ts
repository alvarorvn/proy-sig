import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {}

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/pagodocentes']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
