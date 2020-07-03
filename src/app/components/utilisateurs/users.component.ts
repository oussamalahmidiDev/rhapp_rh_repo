import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { SalariesService } from "../../services/salaries.service";
import { User } from "../../models/user";
import { UserFormComponent } from "../forms/user-form/user-form.component";
import { UserUpdateFormComponent } from "../forms/user-updateform/user-update-form.component";
import { UsersService } from "../../services/users.service";
import { Select, Store } from "@ngxs/store";
import { DeleteUser, GetUsers } from "../../actions/users.action";
import { UsersState } from "../../states/users.state";
import { Observable } from "rxjs";

@Injectable()
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  @Select(UsersState.getUsers)
  users: Observable<User[]>;

  usersDs: MatTableDataSource<User>;
  userCols: string[] = ["nomcomplet", "email", "role", "date", "actions"];

  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store,
    private service: UsersService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService
  ) {
    this.usersDs = new MatTableDataSource<User>();
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.store.dispatch(new GetUsers());
    this.users.subscribe((data) => {
      this.usersDs = new MatTableDataSource<User>(data);
      this.usersDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
      this.usersDs.sortingDataAccessor = (item, property) => {
        switch (property) {
          case "date":
            return new Date(item.dateCreation);
          default:
            return item[property];
        }
      };
    });
  }

  deleteUser(id) {
    if (confirm("Voulez vous supprimer cet utilisateur ?")) {
      this.store.dispatch(new DeleteUser(id));
    }
  }

  modifyUser(user: User) {
    const dialogRef = this.dialog.open(UserUpdateFormComponent, {
      width: "500px",
      data: user,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.openSnackBar("Utilisateur modifié avec succès");
      //
      // if (data !== undefined) {
      //   console.log('Subtask Dialog output:', data);
      //   // console.log(this.users[this.users.indexOf(data)]);
      //   // this.users = this.users.map(user => user.id === data.id ? user = data : user);
      //   // this.usersDs.data = this.users;
      //   this.openSnackBar('Utilisateur modifié avec succès');
      // }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  openUserForm(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: "500px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log('Subtask Dialog output:', data);
      if (data) this.openSnackBar("Utilisateur ajouté avec succès");
      // if (data !== undefined) {
      //   if (data.id !== null || data.id !== undefined) {
      //     // this.users.unshift(data);
      //     // this.usersDs.data = this.users;
      //     this.openSnackBar('Utilisateur ajouté avec succès');
      //   }
      // }
    });
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDs.filter = filterValue.trim().toLowerCase();
  }
}
