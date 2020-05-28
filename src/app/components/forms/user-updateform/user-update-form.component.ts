import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { User } from "../../../models/user";
import { ProfileService } from "src/app/services/user.service";
import { Store } from "@ngxs/store";
import { ModifyUser } from "../../../actions/users.action";

interface Role {
  value: string;
  text: string;
}

@Component({
  selector: "app-user-update-form",
  templateUrl: "./user-update-form.component.html",
  styleUrls: ["./user-update-form.component.css"],
})
export class UserUpdateFormComponent implements OnInit {
  formGroup: FormGroup;

  roles: Role[];

  errors: string[];

  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private service: ProfileService
  ) {
    this.roles = [
      { value: "ADMIN", text: "Administrateur" },
      { value: "RH", text: "Agent RH" },
    ];
  }

  submitForm() {
    console.log(this.formGroup);
    this.errors = [];
    const user: User = this.formGroup.value;
    this.store.dispatch(new ModifyUser(this.data.id, user)).subscribe(
      () => this.dialogRef.close(),
      (error) => this.errors.push(error.error.message)
    );
    // this.service.updateUser(this.data.id, user)
    // .subscribe(data => this.dialogRef.close(data),
    // error => this.errors.push(error.error.message)
    // );
  }

  ngOnInit() {
    console.log(this.data);
    this.dialogRef.backdropClick().subscribe((_) => {
      console.log(this.formGroup);
      if (!this.formGroup.dirty) {
        console.log("UPDATE FORM IS NOT TOUCHED");
        this.dialogRef.close();
      } else {
        if (
          confirm(
            "Vos modifications vont être ignorés. Voulez-vous continuez ?"
          )
        ) {
          this.dialogRef.close();
        }
      }
    });
    this.formGroup = this._formBuilder.group({
      nom: [this.data.nom, Validators.pattern("[A-Za-z ]{1,32}")],
      prenom: [this.data.prenom, Validators.pattern("[A-Za-z ]{1,32}")],
      email: [this.data.email, Validators.email],
      role: [this.data.role, Validators.required],
    });
  }
}
