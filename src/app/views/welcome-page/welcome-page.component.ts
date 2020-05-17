import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"]
})
export class WelcomePageComponent implements OnInit {

  loginForm: FormGroup;

  loggingIn: boolean;

  constructor(
    private router: Router,
     private authService: UserService,
     private formGroup: FormBuilder,
     private cookieService: CookieService,
     private tokenService: TokenService
     ) {}

  ngOnInit() {
    this.loggingIn = false;
    this.loginForm = this.formGroup.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }




  error: string = null;


  login() {
    this.loggingIn = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        console.log(data);
        this.loggingIn = false;
        this.tokenService.setNewToken(data.token);
        this.router.navigate(['/home/dashboard']).then(() => this.router.navigate(['/home/dashboard'])).catch(err => console.log(err));
      },
      error => {
        console.log(error);
        this.loggingIn = false;
        this.error = error.error.message;
      }
    );

  }
}
