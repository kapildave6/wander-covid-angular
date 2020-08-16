import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  loginFormGroup : any;

  displayMessage = false;
  message = "";
  errorMessage = false;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(value : any) {
    let body = {
      username: value.email,
      password: value.password
    }

    this.authenticationService.authenticate(body).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    )
  }
  handleError(error: any): void {
    console.log(error['error']);
    this.errorMessage = true;
    this.message = error['error'];
    this.displayMessage = true;
  }

  handleResponse(response: any): void {
    if (response['token']) {
      sessionStorage.setItem('token', response['token']);

      this.displayMessage = true;
      this.message = "Login Successful. Redirecting to Dashboard...."
      this.errorMessage = false;
      setTimeout(() => {
        this.router.navigateByUrl("/welcome");
      }, 3000);
    } else {
      this.message = response['error'];
      this.displayMessage = true;
      this.errorMessage = true;
    }
  }
}
