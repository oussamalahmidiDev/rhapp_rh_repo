import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from './cookie.service';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token: string;
  decodedToken: any;

  getToken() {
    return this.token;
  }

  setNewToken(token) {
    this.cookieService.remove('token');
    this.cookieService.set('token', token);
    this.token = token;
  }


  setToken() {
    const token = this.cookieService.get('token');
    if (token) {
      this.token = token;
    }
  }

  unsetToken() {
    this.cookieService.remove('token');
    this.token = this.decodedToken = null;
  }

  decodeToken() {
    if (this.token) {
    this.decodedToken = jwt_decode(this.token);
    console.log("DECODED TOKEN", this.decodedToken);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.token);
  }

  getUser() {
    this.decodeToken();
    console.log('TOKEN USER', this.decodedToken);
    return this.decodedToken;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }

  constructor(private cookieService: CookieService) { this.setToken() }
}
