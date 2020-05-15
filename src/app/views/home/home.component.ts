import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProfileModalComponent } from 'src/app/components/forms/profile-modal/profile-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      data => this.currentUser = data,
      error => console.log(error.error)
    );
  }

  logout() : void {
    this.userService.logout();
  }

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog ) {}

  openProfileModal () {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      data: this.currentUser,
      disableClose: true,
      width: '500px',
      position: { top: '15px', right: '10px' }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) 
          this.currentUser = data;
      }
    )
  }

}
