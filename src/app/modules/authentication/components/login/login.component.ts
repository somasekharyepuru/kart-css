import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.loginForm.value).subscribe( data => {

    }, error => {

    })
  }

  public get f() {
    return this.loginForm.controls;
  }

}
