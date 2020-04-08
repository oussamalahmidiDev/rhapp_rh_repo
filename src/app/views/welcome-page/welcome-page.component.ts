import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"]
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router, private authService: UserService) {}

  ngOnInit() {}

  error: string = null;

  authenticate(): void {
    localStorage.setItem("loggedin", "1");
    this.router.navigateByUrl("/dashboard");
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['home']);
        // this.authService.currentUser.name = data['user']['nom'] + ' ' + data['user']['prenom']
        // localStorage.setItem('loggedin', "1");
      },
      err => {
        this.error = err.error.message
      }
    );

    // const login = await this.authService.login(email, password);
    // await console.log("LOGIN",login);
    // if (!login.success) {
    //   this.error = login.message;
    //   console.log(email, password);
    // }
    // return false;
  }
}
