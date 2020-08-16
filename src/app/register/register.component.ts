import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;

  displayMessage = false;
  message = "";
  errorMessage = false;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
    });
  }

  onSubmit(value) {
    var body = {
      name: value['name'],
      emailAddress: value['email'],
      password: value['password']
    }
    this.authenticationService.registerUser(body).subscribe(
      response => this.handleSuccess(response),
      error => this.handleError(error)
    )
  }

  handleError(error: any): void {
    console.log(error['error']);
    this.errorMessage = true;
    this.message = error['error'];
    this.displayMessage = true;
  }

  handleSuccess(response: Object): void {
    if (response['message'] == "Success") {
      this.displayMessage = true;
      this.message = "Registration Successful. Redirecting to login...."
      this.errorMessage = false;
      setTimeout(() => {
        this.router.navigateByUrl("/login");
      }, 3000);
    } else {
      this.message = response['error'];
      this.displayMessage = true;
      this.errorMessage = true;
    }
    console.log(response);
  }

  json(object) {
    return JSON.stringify(object);
  }

  get f() { return this.registerForm.controls; }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

}
