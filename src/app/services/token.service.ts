import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { CookieService } from "./cookie.service";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  token: string;
  decodedToken: any;

  constructor(private cookieService: CookieService) {
    this.setToken();
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setNewToken(token) {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    this.token = token;
  }

  setToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token = token;
    }
  }

  unsetToken() {
    localStorage.removeItem("token");
    this.token = this.decodedToken = null;
  }

  decodeToken() {
    if (this.token) {
      this.decodedToken = jwt_decode(this.token);
    }
  }

  getDecodeToken() {
    return jwt_decode(this.token);
  }

  getUser() {
    this.decodeToken();
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
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
