import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Poste} from 'src/app/models/poste';
import {User} from '../../../models/user';
import {Store} from '@ngxs/store';
import {CreateUser} from '../../../actions/users.action';

interface Role {
  value: string;
  text: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formGroup: FormGroup;

  roles: Role[];

  errors: string[];

  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Poste[],
  ) {

    this.roles = [
      {value: 'ADMIN', text: 'Administrateur'},
      {value: 'RH', text: 'Agent RH'},
    ];
  }


  submitForm() {
    console.log(this.formGroup);
    this.errors = [];
    const newUser: User = this.formGroup.value;
    console.log(newUser);
    this.store.dispatch(new CreateUser(newUser))
      .subscribe(() => this.dialogRef.close(), error => this.errors.push(error.error.message));

  }


  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(
      _ => {
        console.log(this.formGroup);
        if (!this.formGroup.dirty) {
          console.log('FORM IS TOUCHED');
          this.dialogRef.close();
        } else {
          if (confirm('Vos données vont être ignorés. Voulez-vous continuez ?')) {
            this.dialogRef.close();
          }
        }
      }
    );

    this.formGroup = this._formBuilder.group({
      nom: ['', Validators.pattern('[A-Za-z ]{1,32}')],
      prenom: ['', Validators.pattern('[A-Za-z ]{1,32}')],
      email: ['', Validators.email],
      role: ['', Validators.required],
    });

    console.log(this.formGroup);

  }

}
