import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from '../../services/cookie.service';
import {TokenService} from '../../services/token.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  forgotPasswordFormHidden = true;

  loggingIn: boolean;
  error: string = null;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: UserService,
    private formGroup: FormBuilder,
    private cookieService: CookieService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.loggingIn = false;
    this.loginForm = this.formGroup.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.forgotPasswordForm = this.formGroup.group({
      email: [this.loginForm.value.email, [Validators.required, Validators.email]]
    });
  }

  switchForms() {
    this.error = null;
    this.forgotPasswordFormHidden = !this.forgotPasswordFormHidden;
    this.forgotPasswordForm.patchValue({
      email: this.loginForm.value.email
    });
  }

  login() {
    if (this.loginForm.invalid || this.loggingIn) {
      return;
    }
    this.error = null;
    this.loggingIn = true;
    this.authService.login(this.loginForm.value.email.toLocaleLowerCase(), this.loginForm.value.password).subscribe(
      data => {
        console.log(data);
        this.loggingIn = false;
        this.tokenService.setNewToken(data.token);
        this.router.navigate(['/home/dashboard']).then(() => this.router.navigate(['/home/dashboard'])).catch(err => console.log(err));
      },
      error => {
        this.loggingIn = false;
        this.error = error.error.message;
      }
    );
  }

  sendPasswordRecovery() {
    if (this.forgotPasswordForm.invalid || this.loggingIn) {
      return;
    }
    this.error = null;
    this.loggingIn = true;
    this.authService.sendPasswordRecoveryRequest(this.forgotPasswordForm.value.email.toLocaleLowerCase().trim()).subscribe(
      data => {
        this.openSnackBar(data.message);
        this.forgotPasswordFormHidden = true;
        this.loggingIn = false;
      },
      error => {
        this.error = error.error.message;
        this.loggingIn = false;
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
