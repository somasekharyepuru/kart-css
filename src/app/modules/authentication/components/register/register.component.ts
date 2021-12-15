import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    // private toastr: ToastrService,
    private router: Router
  ) {
    // if (!!this.authenticateService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  user: User = <User>{};
  public isValidPassword: boolean = false;
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    }, {
        validators: [this.checkPasswords]
      })
  }

  register() {
    this.authService.register(this.signUpForm.value).subscribe(data => {

    }, error => {
      // this.toastr.error('Registration Failed', error);
      alert("Register Failed");
    })
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  public get f() {
    return this.signUpForm.controls;
  }

}
